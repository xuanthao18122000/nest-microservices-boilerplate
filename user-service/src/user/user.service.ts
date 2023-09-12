import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { User } from 'src/database/schema';
import { ILike, IsNull, Not, Repository, SelectQueryBuilder } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto/user.dto';
import FilterBuilderService from 'src/common/filter-builder/filter-builder.service';
import { IDateQuery } from 'src/common/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private _filterBuilder: FilterBuilderService,
  ) {}

  async addSubscriber(createUserDto: CreateUserDto) {}

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  async getAll(query: ListUserDto) {
    const { page, perPage } = query;

    query.filter = {
      selectFields: ['id', 'fullName', 'email', 'avatar', 'phoneNumber', 'gender', 'address', 'status', 'createdAt', 'updatedAt'],
      unaccentFields: ['fullName'],
      numberFields: [],
      stringFields: ['phoneNumber'],
      dateFields: {
        dateName: 'createdAt',
        startDateField: 'startDate',
        endDateField: 'endDate',
      },
      sortName: 'Id',
    };

    const entityName = 'users';
    const queryBuilder = this.userRepo.createQueryBuilder(entityName);
    const users = this._filterBuilder.buildQuery(
      User,
      entityName,
      queryBuilder,
      query,
    );

    const [list, total] = await users.getManyAndCount();

    return { list, total, page: page / 1, perPage: perPage / 1 };
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
      gender,
    });
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const { fullName, phoneNumber, gender, address } = body;
    const user = await this.findUserByPk(id);
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (gender) user.gender = gender;
    if (address) user.address = address;

    return await this.userRepo.save(user);
  }

  async findUserByPk(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['USER_NOT_FOUND'].code,
        code['USER_NOT_FOUND'].type,
      );
    }
    return user;
  }
}
