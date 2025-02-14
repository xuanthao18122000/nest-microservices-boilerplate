import { ConflictException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/interfaces/user/user-repository.interface';

@Injectable()
export class CheckExistedEmailUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('Đã tồn tại người dùng!');
    }
  }
}
