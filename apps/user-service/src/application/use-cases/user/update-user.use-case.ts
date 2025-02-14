import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { User } from 'apps/user-service/src/domain/entities/user.entity';
import { IUserRepository } from '../../../domain/interfaces/user/user-repository.interface';
import { isDefined } from 'class-validator';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    user: User,
    { avatar, fullName, status, roleId, address, phoneNumber }: UpdateUserDto,
  ): Promise<User> {
    if (isDefined(fullName)) user.fullName = fullName;
    if (isDefined(avatar)) user.avatar = avatar;
    if (isDefined(status)) user.status = status;
    if (isDefined(roleId)) user.roleId = roleId;
    if (isDefined(address)) user.address = address;
    if (isDefined(phoneNumber)) user.phoneNumber = phoneNumber;

    return this.userRepository.save(user);
  }
}
