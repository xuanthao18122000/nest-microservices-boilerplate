import { ListCustomerDto } from '../../application/dto/customer/list-customer.dto';
import { Customer } from '../entities/customer.entity';

export abstract class ICustomerRepository {
  abstract create(customer: Partial<Customer>): Customer;
  abstract save(customer: Customer): Promise<Customer>;
  abstract getManyAndCount(listCustomerDto: ListCustomerDto): Promise<[Customer[], number]>;
  abstract findById(id: number): Promise<Customer>;
  abstract findOne(options: FindOneOptions<Customer>): Promise<Customer>;
}
