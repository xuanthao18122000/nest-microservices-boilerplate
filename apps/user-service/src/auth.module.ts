import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces/user/user-repository.interface';
import { User } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInUseCase } from './application/use-cases/auth/sign-in.use-case';
import { GetProfileUseCase } from './application/use-cases/auth/get-me.use-case';
import { SignOutUseCase } from './application/use-cases/auth/sign-out.use-case';
import { SignUpUseCase } from './application/use-cases/auth/sign-up.use-case';
import { JwtService } from '@nestjs/jwt';
import { CheckExistedEmailUserUseCase } from './application/use-cases/user/check-existed-email-user.use-case';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthUseCase } from './application/use-cases/auth/auth.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    JwtService,
    AuthUseCase,
    SignInUseCase,
    SignUpUseCase,
    SignOutUseCase,
    GetProfileUseCase,
    CheckExistedEmailUserUseCase,
  ],
})
export class AuthModule {}
