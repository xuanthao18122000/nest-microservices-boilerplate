import { FindOneOptions } from 'typeorm';
import { ListRoleDto } from '../../../application/dto/role/list-role.dto';
import { Role } from '../../entities/role.entity';

export abstract class IRoleRepository {
  abstract create(role: Partial<Role>): Role;
  abstract save(role: Role): Promise<Role>;
  abstract getManyAndCount(listRoleDto: ListRoleDto): Promise<[Role[], number]>;
  abstract findOne(options: FindOneOptions<Role>): Promise<Role>;
}
