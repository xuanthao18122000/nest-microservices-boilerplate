import { Injectable } from '@nestjs/common';
import { ListCustomerDto } from '../../dto/customer/list-customer.dto';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';
import { ICustomerTierRepository } from 'apps/customer-service/src/domain/interfaces/customer-tier-repository.interface';
import { ListCustomerTierDto } from '../../dto/customer-tier/list-customer-tier.dto';
import { CustomerTier } from 'apps/customer-service/src/domain/entities/customer-tier.entity';

@Injectable()
export class GetAllCustomerTierUseCase {
  constructor(
    private readonly customerTierRepository: ICustomerTierRepository,
  ) {}

  async execute(
    listCustomerTierDto: ListCustomerTierDto,
  ): Promise<[CustomerTier[], number]> {
    return this.customerTierRepository.getManyAndCount(listCustomerTierDto);
  }
}
