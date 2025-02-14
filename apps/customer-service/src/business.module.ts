import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './domain/entities/business.entity';
import { BusinessController } from './application/controllers/business.controller';
import { IBusinessRepository } from './domain/interfaces/business-repository.interface';
import { BusinessRepository } from './infrastructure/repositories/business.repository';
import { BusinessService } from './application/services/business.service';
import { CreateBusinessUseCase } from './application/use-cases/business/create-business.use-case';
import { UpdateBusinessUseCase } from './application/use-cases/business/update-business.use-case';
import { GetOneBusinessUseCase } from './application/use-cases/business/get-one-business.use-case';
import { GetAllBusinessUseCase } from './application/use-cases/business/get-all-business.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessController],
  providers: [
    {
      provide: IBusinessRepository,
      useClass: BusinessRepository,
    },
    BusinessService,
    CreateBusinessUseCase,
    UpdateBusinessUseCase,
    GetOneBusinessUseCase,
    GetAllBusinessUseCase,
  ],
})
export class BusinessModule {}
