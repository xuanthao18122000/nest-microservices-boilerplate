import { ConflictException, Injectable } from '@nestjs/common';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces';
import { SignUpDto } from '../../dto/auth/sign-up.dto';
import { bcryptGenerateHash } from '@app/common/helpers/hash.helper';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, address, password, fullName, phoneNumber }: SignUpDto) {
    const user = this.userRepository.create({
      email,
      password: await bcryptGenerateHash(password),
      address,
      fullName,
      phoneNumber,
    });

    return await this.userRepository.save(user);
  }
}
