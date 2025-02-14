import { Injectable } from '@nestjs/common';
import { Customer } from '../../domain/entities/customer.entity';
import { ICustomerRepository } from '../../domain/interfaces/customer-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListCustomerDto } from '../../application/dto/customer/list-customer.dto';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  @InjectRepository(Customer)
  private readonly customerRepo: Repository<Customer>;

  create(customer: Partial<Customer>) {
    return this.customerRepo.create(customer);
  }

  save(customer: Customer): Promise<Customer> {
    return this.customerRepo.save(customer);
  }

  getManyAndCount(query: ListCustomerDto): Promise<[Customer[], number]> {
    const filterBuilder = this.customerRepo
      .fCreateFilterBuilder('customer', query)
      .fAndWhereLikeString('fullName')
      .fAndWhere('status')
      .fAndWhere('creatorId')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findById(id: number): Promise<Customer> {
    return this.customerRepo.findOneBy({ id });
  }

  findOne(options: FindOneOptions<Customer>): Promise<Customer> {
    return this.customerRepo.findOneBy(criteria);
  }
}
