import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ListUserDto } from '../../../application/dto/user/list-user.dto';
import { User } from '../../entities/user.entity';

export abstract class IUserRepository {
  abstract create(user: Partial<User>): User;
  abstract save(user: User): Promise<User>;
  abstract getManyAndCount(listUserDto: ListUserDto): Promise<[User[], number]>;
  abstract findOne(options: FindOneOptions<User>): Promise<User>;
  abstract count(options?: FindManyOptions<User>): Promise<number> ;
}
