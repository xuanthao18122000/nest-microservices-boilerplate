import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCustomerDto } from '../../dto/customer/update-customer.dto';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException('Không tìm thấy');
    }

    Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(customer);
  }
}
