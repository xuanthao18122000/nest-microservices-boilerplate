import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTier } from './domain/entities/customer-tier.entity';
import { CustomerTierController } from './application/controllers/customer-tier.controller';
import { ICustomerTierRepository } from './domain/interfaces/customer-tier-repository.interface';
import { CustomerTierRepository } from './infrastructure/repositories/customer-tier.repository';
import { CustomerTierService } from './application/services/customer-tier.service';
import { CreateCustomerTierUseCase } from './application/use-cases/customer-tier/create-customer-tier.use-case';
import { UpdateCustomerTierUseCase } from './application/use-cases/customer-tier/update-customer-tier.use-case';
import { GetOneCustomerTierUseCase } from './application/use-cases/customer-tier/get-one-customer-tier.use-case';
import { GetAllCustomerTierUseCase } from './application/use-cases/customer-tier/get-all-customer-tier.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerTier])],
  controllers: [CustomerTierController],
  providers: [
    {
      provide: ICustomerTierRepository,
      useClass: CustomerTierRepository,
    },
    CustomerTierService,
    CreateCustomerTierUseCase,
    UpdateCustomerTierUseCase,
    GetOneCustomerTierUseCase,
    GetAllCustomerTierUseCase,
  ],
})
export class CustomerTierModule {}
