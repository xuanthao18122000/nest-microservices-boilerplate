import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';

@Injectable()
export class GetOneCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(options: FindOneOptions<Customer>): Promise<Customer> {
    const customer = await this.customerRepository.findOne(criteria);

    if (!customer) {
      throw new NotFoundException('Không tìm thấy khách hàng!');
    }

    return customer;
  }
}
