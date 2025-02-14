import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './domain/entities/role.entity';
import { IRoleRepository } from './domain/interfaces/role/role-repository.interface';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { CreateRoleUseCase } from './application/use-cases/role/create-role.use-case';
import { UpdateRoleUseCase } from './application/use-cases/role/update-role.use-case';
import { GetOneRoleUseCase } from './application/use-cases/role/get-one-role.use-case';
import { GetAllRoleUseCase } from './application/use-cases/role/get-all-role.use-case';
import { RoleController } from './presentation/controllers/role.controller';
import { RoleUseCase } from './application/use-cases/role/role.use-case';
import { CheckExistedKeyRoleUseCase } from './application/use-cases/role/check-existed-key-role.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
    RoleUseCase,
    CreateRoleUseCase,
    UpdateRoleUseCase,
    GetOneRoleUseCase,
    GetAllRoleUseCase,
    CheckExistedKeyRoleUseCase,
  ],
})
export class RoleModule {}
