import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'apps/user-service/src/domain/entities/user.entity';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces/user/user-repository.interface';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class GetOneUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng!');
    }

    return user;
  }
}
