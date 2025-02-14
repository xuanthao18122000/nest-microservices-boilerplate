import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerTier } from 'apps/customer-service/src/domain/entities/customer-tier.entity';
import { ICustomerTierRepository } from 'apps/customer-service/src/domain/interfaces/customer-tier-repository.interface';

@Injectable()
export class GetOneCustomerTierUseCase {
  constructor(
    private readonly customerTierRepository: ICustomerTierRepository,
  ) {}

  async execute(options: FindOneOptions<CustomerTier>): Promise<CustomerTier> {
    const customerTier = await this.customerTierRepository.findOne(criteria);

    if (!customerTier) {
      throw new NotFoundException('Không tìm thấy loại khách hàng!');
    }

    return customerTier;
  }
}
