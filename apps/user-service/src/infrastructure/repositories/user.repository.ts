import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ListUserDto } from '../../application/dto/user/list-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  create(user: Partial<User>) {
    return this.userRepo.create(user);
  }

  save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  count(options?: FindManyOptions<User>): Promise<number> {
    return this.userRepo.count(options);
  }

  getManyAndCount(query: ListUserDto): Promise<[User[], number]> {
    const filterBuilder = this.userRepo
      .fCreateFilterBuilder('user', query)
      .fAndWhereLikeString('fullName')
      .fAndWhere('status')
      .fAndWhere('creatorId')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findOne(options: FindOneOptions<User>): Promise<User> {
    return this.userRepo.findOne(options);
  }
}
