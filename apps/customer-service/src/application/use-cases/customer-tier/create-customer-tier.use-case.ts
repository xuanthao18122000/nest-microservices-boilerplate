import { Injectable } from '@nestjs/common';
import { CustomerTier } from 'apps/customer-service/src/domain/entities/customer-tier.entity';
import { CreateCustomerTierDto } from '../../dto/customer-tier/create-customer-tier.dto';
import { ICustomerTierRepository } from 'apps/customer-service/src/domain/interfaces/customer-tier-repository.interface';
import { User } from 'apps/user-service/src/domain/entities/user.entity';

@Injectable()
export class CreateCustomerTierUseCase {
  constructor(
    private readonly customerTierRepository: ICustomerTierRepository,
  ) {}

  async execute(
    { name, spendingThreshold }: CreateCustomerTierDto,
    user: User,
  ): Promise<CustomerTier> {
    const customerTier = this.customerTierRepository.create({
      name,
      spendingThreshold,
      creatorId: user.id,
    });

    return this.customerTierRepository.save(customerTier);
  }
}
