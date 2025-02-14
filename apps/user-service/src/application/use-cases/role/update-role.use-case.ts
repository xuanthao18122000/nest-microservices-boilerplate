import { Injectable, NotFoundException } from '@nestjs/common';
import { IRoleRepository } from 'apps/user-service/src/domain/interfaces';
import { UpdateRoleDto } from '../../dto/role/update-role.dto';
import { Role } from 'apps/user-service/src/domain/entities/role.entity';
import { isDefined } from 'class-validator';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(role: Role, { name, status }: UpdateRoleDto): Promise<Role> {
    if (isDefined(name)) role.name = name;
    if (isDefined(status)) role.status = status;

    return this.roleRepository.save(role);
  }
}
