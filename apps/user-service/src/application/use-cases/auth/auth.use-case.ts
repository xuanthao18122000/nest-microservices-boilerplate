import { Injectable } from '@nestjs/common';
import { SignInDto } from '../../dto/auth/sign-in.dto';
import { SignUpDto } from '../../dto/auth/sign-up.dto';
import { User } from 'apps/user-service/src/domain/entities/user.entity';
import { CheckExistedEmailUserUseCase } from '../user/check-existed-email-user.use-case';
import { SignInUseCase } from './sign-in.use-case';
import { SignUpUseCase } from './sign-up.use-case';
import { SignOutUseCase } from './sign-out.use-case';
import { GetProfileUseCase } from './get-me.use-case';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly checkExistedEmailUserUseCase: CheckExistedEmailUserUseCase,
  ) {}

  async signIn(signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }

  async signUp(signUpDto: SignUpDto) {
    await this.checkExistedEmailUserUseCase.execute(signUpDto.email);
    return this.signUpUseCase.execute(signUpDto);
  }

  async signOut(user: User) {
    return this.signOutUseCase.execute(user);
  }

  async getProfile(user: User) {
    return this.getProfileUseCase.execute(user);
  }
}
