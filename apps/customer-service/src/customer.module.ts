import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/entities/customer.entity';
import { CustomerController } from './application/controllers/customer.controller';
import { ICustomerRepository } from './domain/interfaces/customer-repository.interface';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { CustomerService } from './application/services/customer.service';
import { CreateCustomerUseCase } from './application/use-cases/customer/create-customer.use-case';
import { UpdateCustomerUseCase } from './application/use-cases/customer/update-customer.use-case';
import { GetOneCustomerUseCase } from './application/use-cases/customer/get-one-customer.use-case';
import { GetAllCustomerUseCase } from './application/use-cases/customer/get-all-customer.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    CustomerService,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    GetOneCustomerUseCase,
    GetAllCustomerUseCase,
  ],
})
export class CustomerModule {}
