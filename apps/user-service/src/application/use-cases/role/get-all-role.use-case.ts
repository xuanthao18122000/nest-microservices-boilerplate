import { Injectable } from '@nestjs/common';
import { IRoleRepository } from 'apps/user-service/src/domain/interfaces';
import { Role } from 'apps/user-service/src/domain/entities/role.entity';
import { ListRoleDto } from '../../dto/role/list-role.dto';

@Injectable()
export class GetAllRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(listRoleDto: ListRoleDto): Promise<[Role[], number]> {
    return this.roleRepository.getManyAndCount(listRoleDto);
  }
}
