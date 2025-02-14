import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'apps/user-service/src/domain/entities/user.entity';

@Injectable()
export class GetProfileUseCase {
  constructor() {}

  async execute(user: User): Promise<User> {
    return user;
  }
}
