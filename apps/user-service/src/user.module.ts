import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/user/update-user.use-case';
import { GetOneUserUseCase } from './application/use-cases/user/get-one-user.use-case';
import { GetAllUserUseCase } from './application/use-cases/user/get-all-user.use-case';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { IUserRepository } from 'apps/user-service/src/domain/interfaces/user/user-repository.interface';
import { User } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsUserUseCase } from './application/use-cases/user/statistics-user.use-case';
import { CheckExistedEmailUserUseCase } from './application/use-cases/user/check-existed-email-user.use-case';
import { UserController } from './presentation/controllers/user.controller';
import { UserUseCase } from './application/use-cases/user/user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    UserUseCase,
    StatisticsUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetOneUserUseCase,
    GetAllUserUseCase,
    CheckExistedEmailUserUseCase,
  ],
})
export class UserModule {}
