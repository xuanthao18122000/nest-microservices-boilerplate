import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dto/customer/create-customer.dto';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute({
    fullName,
    address,
    email,
    gender,
    phoneNumber,
    dateOfBirth,
    type,
  }: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create({
      fullName,
      address,
      email,
      gender,
      phoneNumber,
      dateOfBirth,
      type,
    });

    return this.customerRepository.save(customer);
  }
}
