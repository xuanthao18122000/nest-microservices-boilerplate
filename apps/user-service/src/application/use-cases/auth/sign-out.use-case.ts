import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces';
import { User } from 'apps/user-service/src/domain/entities/user.entity';

@Injectable()
export class SignOutUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user: User) {
    user.lastLogOutDate = new Date();
    return await this.userRepository.save(user);
  }
}
