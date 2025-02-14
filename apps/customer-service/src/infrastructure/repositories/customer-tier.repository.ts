import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerTierRepository } from '../../domain/interfaces/customer-tier-repository.interface';
import { CustomerTier } from '../../domain/entities/customer-tier.entity';
import { ListCustomerTierDto } from '../../application/dto/customer-tier/list-customer-tier.dto';

@Injectable()
export class CustomerTierRepository implements ICustomerTierRepository {
  @InjectRepository(CustomerTier)
  private readonly customerTierRepo: Repository<CustomerTier>;

  create(customerTier: Partial<CustomerTier>) {
    return this.customerTierRepo.create(customerTier);
  }

  save(customerTier: CustomerTier): Promise<CustomerTier> {
    return this.customerTierRepo.save(customerTier);
  }

  getManyAndCount(
    query: ListCustomerTierDto,
  ): Promise<[CustomerTier[], number]> {
    const filterBuilder = this.customerTierRepo
      .fCreateFilterBuilder('customerTier', query)
      .fAndWhereLikeString('name')
      .fAndWhere('status')
      .fAndWhere('creatorId')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findById(id: number): Promise<CustomerTier> {
    return this.customerTierRepo.findOneBy({ id });
  }

  findOne(options: FindOneOptions<CustomerTier>): Promise<CustomerTier> {
    return this.customerTierRepo.findOneBy(criteria);
  }
}
