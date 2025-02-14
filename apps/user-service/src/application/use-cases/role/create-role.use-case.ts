import { Injectable } from '@nestjs/common';
import { IRoleRepository } from 'apps/user-service/src/domain/interfaces';
import { CreateRoleDto } from '../../dto/role/create-role.dto';
import { Role } from 'apps/user-service/src/domain/entities/role.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create({
      key: createRoleDto.key,
      name: createRoleDto.name,
    });

    return this.roleRepository.save(role);
  }
}
