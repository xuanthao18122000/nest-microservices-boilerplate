import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'apps/user-service/src/domain/entities/role.entity';
import { IRoleRepository } from 'apps/user-service/src/domain/interfaces';

@Injectable()
export class GetOneRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(id: number): Promise<Role> {
    const role = this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('Không tìm thấy chức vụ!');
    }

    return role;
  }
}
