import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCustomerDto } from '../../dto/customer/update-customer.dto';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';
import { ICustomerTierRepository } from 'apps/customer-service/src/domain/interfaces/customer-tier-repository.interface';
import { UpdateCustomerTierDto } from '../../dto/customer-tier/update-customer-tier.dto';
import { CustomerTier } from 'apps/customer-service/src/domain/entities/customer-tier.entity';

@Injectable()
export class UpdateCustomerTierUseCase {
  constructor(
    private readonly customerTierRepository: ICustomerTierRepository,
  ) {}

  async execute(
    id: number,
    updateCustomerTierDto: UpdateCustomerTierDto,
  ): Promise<CustomerTier> {
    const customerTier = await this.customerTierRepository.findById(id);

    if (!customerTier) {
      throw new NotFoundException('Không tìm thấy loại khách hàng!');
    }

    Object.assign(customerTier, updateCustomerTierDto);

    return this.customerTierRepository.save(customerTier);
  }
}
