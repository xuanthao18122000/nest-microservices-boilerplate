import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Role } from '../../domain/entities/role.entity';
import { IRoleRepository } from '../../domain/interfaces/role/role-repository.interface';
import { ListRoleDto } from '../../application/dto/role/list-role.dto';

@Injectable()
export class RoleRepository implements IRoleRepository {
  @InjectRepository(Role)
  private readonly roleRepo: Repository<Role>;

  create(role: Partial<Role>) {
    return this.roleRepo.create(role);
  }

  save(role: Role): Promise<Role> {
    return this.roleRepo.save(role);
  }

  getManyAndCount(query: ListRoleDto): Promise<[Role[], number]> {
    const filterBuilder = this.roleRepo
      .fCreateFilterBuilder('financeExternal', query)
      .fAndWhereLikeString('fullName')
      .fAndWhere('status')
      .fAndWhere('creatorId')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findOne(options: FindOneOptions<Role>): Promise<Role> {
    return this.roleRepo.findOne(options);
  }
}
