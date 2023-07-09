import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Employee } from 'src/database/schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto, ListEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  async getAll(query: ListEmployeeDto) {
    const { page, perPage } = query;
    const [list, total] = await this.employeeRepo
      .createQueryBuilder('employee')
      .getManyAndCount();

    return { list, total, page: page/1, perPage: perPage/1  };
  }

  async getOne(id: number): Promise<Employee | any> {
    const employee = await this.findEmployeeByPk(id);
    return employee.serialize();
  }

  async create(body: CreateEmployeeDto) {
    const { email, password, fullName, gender, phoneNumber } = body;
    const isExistEmployee = await this.employeeRepo.findOneBy({
      email,
    });

    if (isExistEmployee) {
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
      gender
    });
  }

  async update(id: number, body: UpdateEmployeeDto): Promise<Employee> {
    const { fullName, phoneNumber, gender, address } = body;
    const employee = await this.findEmployeeByPk(id);
    if(fullName) employee.fullName = fullName;
    if(phoneNumber) employee.phoneNumber = phoneNumber;
    if(gender) employee.gender = gender;
    if(address) employee.address = address;

    return await this.employeeRepo.save(employee);
  }

  async findEmployeeByPk(id: number): Promise<Employee>{
    const employee = await this.employeeRepo.findOneBy({ id });
    if (!employee) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['EMPLOYEE_NOT_FOUND'].code,
        code['EMPLOYEE_NOT_FOUND'].type,
      );
    }
    return employee
  }
}
