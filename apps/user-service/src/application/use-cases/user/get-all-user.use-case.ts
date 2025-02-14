import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces/user/user-repository.interface';
import { ListUserDto } from '../../dto/user/list-user.dto';

@Injectable()
export class GetAllUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(listUserDto: ListUserDto) {
    return await this.userRepository.getManyAndCount(listUserDto);
  }
}
