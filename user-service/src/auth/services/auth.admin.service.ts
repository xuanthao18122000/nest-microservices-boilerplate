import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee, User } from 'src/database/schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Request } from 'express';

@Injectable()
export class AuthAdminService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  public comparePasswords(password: string, storedPasswordHash: string) {
    return bcrypt.compareSync(password, storedPasswordHash);
  }

  async signToken(employeeId: number, email: string) {
    const payload = {
      id: employeeId,
      email,
    };

    const secret = process.env.JWT_SECRET;
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
    return {
      token,
      expiresIn: '1d',
    };
  }

  async login({ email, password }: LoginDto) {
    const employee = await this.employeeRepo
      .createQueryBuilder('employee')
      .where('employee.email = :email', { email })
      .getOne();

    if (!employee) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['EMPLOYEE_NOT_FOUND'].code,
        code['EMPLOYEE_NOT_FOUND'].type,
      )
    }

    if (employee.status === -1) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['EMPLOYEE_INACTIVE'].code,
        code['EMPLOYEE_INACTIVE'].type,
      )
    }

    const isAuth = this.comparePasswords(password, employee.password);
    if (!isAuth) {
    }

    const jwt = await this.signToken(employee.id, employee.email);
    employee.token = jwt.token;
    const saveToken = await this.employeeRepo.save(employee);

    // for (let item of employee.userRole) {
    //   employee['role'] = {
    //     id: item.role.id,
    //     key: item.role.key,
    //     name: item.role.name,
    //   };
    // }

    return {
      employee: employee.serialize(),
      token: jwt.token,
      expiresIn: jwt.expiresIn,
    };
  }

  async register({ email, password, fullName, phoneNumber }: RegisterDto) {
    const isExistUser = await this.employeeRepo.findOneBy({
      email,
    });

    if (isExistUser) {
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code['EMPLOYEE_EXISTED'].code,
        code['EMPLOYEE_EXISTED'].type,
      );
    }

    return await this.employeeRepo.save({
      email,
      password: this.hashPassword(password),
      phoneNumber,
      status: 1,
      fullName,
    });
  }

  async logout(){

  }

  async forgotPassword(body) {

  }

  async changPassword(body){

  }


  async getProfile(id: number){
    const employee = await this.employeeRepo.findOneBy({
      id: 1
    });
    return employee.serialize();
  }

  async updateProfile(body){
    
  }
}
