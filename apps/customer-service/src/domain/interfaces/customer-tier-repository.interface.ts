import { ListCustomerTierDto } from '../../application/dto/customer-tier/list-customer-tier.dto';
import { CustomerTier } from '../entities/customer-tier.entity';

export abstract class ICustomerTierRepository {
  abstract create(customerTier: Partial<CustomerTier>): CustomerTier;
  abstract save(customerTier: CustomerTier): Promise<CustomerTier>;
  abstract getManyAndCount(
    listCustomerTierDto: ListCustomerTierDto,
  ): Promise<[CustomerTier[], number]>;
  abstract findById(id: number): Promise<CustomerTier>;
  abstract findOne(options: FindOneOptions<CustomerTier>): Promise<CustomerTier>;
}
