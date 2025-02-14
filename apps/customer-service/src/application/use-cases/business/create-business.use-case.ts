import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dto/customer/create-customer.dto';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';
import { CreateBusinessDto } from '../../dto/business/create-business.dto';
import { Business } from 'apps/customer-service/src/domain/entities/business.entity';
import { IBusinessRepository } from 'apps/customer-service/src/domain/interfaces/business-repository.interface';

@Injectable()
export class CreateBusinessUseCase {
  constructor(private readonly businessRepository: IBusinessRepository) {}

  async execute({
    name,
    address,
    email,
    note,
    phoneNumber,
    taxCode,
  }: CreateBusinessDto): Promise<Business> {
    const business = this.businessRepository.create({
      name,
      address,
      email,
      note,
      phoneNumber,
      taxCode,
    });

    return this.businessRepository.save(business);
  }
}
