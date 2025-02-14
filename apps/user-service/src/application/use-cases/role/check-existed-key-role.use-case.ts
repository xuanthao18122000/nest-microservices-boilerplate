import { ConflictException, Injectable } from '@nestjs/common';
import { IRoleRepository } from 'apps/user-service/src/domain/interfaces';

@Injectable()
export class CheckExistedKeyRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(key: string): Promise<void> {
    const user = await this.roleRepository.findOne({ where: { key } });

    if (user) {
      throw new ConflictException('Đã tồn tại key của Role!');
    }
  }
}
