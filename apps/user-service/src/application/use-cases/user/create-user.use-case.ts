import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { User } from 'apps/user-service/src/domain/entities/user.entity';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces/user/user-repository.interface';
import { bcryptGenerateHash } from '@app/common/helpers/hash.helper';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    email,
    fullName,
    password,
    address,
    avatar,
    phoneNumber,
    roleId,
  }: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      email,
      fullName,
      address,
      avatar,
      phoneNumber,
      roleId,
      password: await bcryptGenerateHash(password),
    });

    return this.userRepository.save(user);
  }
}
