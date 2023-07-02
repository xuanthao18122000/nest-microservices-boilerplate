import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { User } from 'src/database/schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto/user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  async getAll(query: ListUserDto) {
    const { page, perPage } = query;
    const [list, total] = await this.userRepo
      .createQueryBuilder('user')
      .getManyAndCount();

    return { list, total, page, perPage };
  }

  async getOne(id: number): Promise<User | any> {
    const user = await this.findUserByPk(id);
    return user.serialize();
  }

  async create(body: CreateUserDto) {
    const { email, password, fullName, gender, phoneNumber } = body;
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
      gender
    });
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const { fullName, phoneNumber, gender, address } = body;
    const user = await this.findUserByPk(id);
    if(fullName) user.fullName = fullName;
    if(phoneNumber) user.phoneNumber = phoneNumber;
    if(gender) user.gender = gender;
    if(address) user.address = address;

    return await this.userRepo.save(user);
  }

  async findUserByPk(id: number): Promise<User>{
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['USER_NOT_FOUND'].code,
        code['USER_NOT_FOUND'].type,
      );
    }
    return user
  }
}
