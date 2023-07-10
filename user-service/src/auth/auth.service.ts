import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  public comparePasswords(password: string, storedPasswordHash: string) {
    return bcrypt.compareSync(password, storedPasswordHash);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      id: userId,
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
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['USER_NOT_FOUND'].code,
        code['USER_NOT_FOUND'].type,
      )
    }

    if (user.status === -1) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['USER_INACTIVE'].code,
        code['USER_INACTIVE'].type,
      )
    }

    const isAuth = this.comparePasswords(password, user.password);
    if (!isAuth) {
    }

    const jwt = await this.signToken(user.id, user.email);
    user.token = jwt.token;
    const saveToken = await this.userRepo.save(user);

    // for (let item of user.userRole) {
    //   user['role'] = {
    //     id: item.role.id,
    //     key: item.role.key,
    //     name: item.role.name,
    //   };
    // }

    return {
      user: user.serialize(),
      token: jwt.token,
      expriresIn: jwt.expiresIn,
    };
  }

  async register({ email, password, fullName, phoneNumber }: RegisterDto) {
    const isExistUser = await this.userRepo.findOneBy({
      email,
    });

    if (isExistUser) {
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code['USER_EXISTED'].code,
        code['USER_EXISTED'].type,
      );
    }

    return await this.userRepo.save({
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
    const user = await this.userRepo.findOneBy({
      id: 1
    });
    return user.serialize();
  }

  async updateProfile(body){
    
  }
}
