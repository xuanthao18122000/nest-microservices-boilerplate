import { Injectable } from '@nestjs/common';
import { ListCustomerDto } from '../../dto/customer/list-customer.dto';
import { ICustomerRepository } from 'apps/customer-service/src/domain/interfaces/customer-repository.interface';
import { Customer } from 'apps/customer-service/src/domain/entities/customer.entity';

@Injectable()
export class GetAllCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(
    listCustomerDto: ListCustomerDto,
  ): Promise<[Customer[], number]> {
    return this.customerRepository.getManyAndCount(listCustomerDto);
  }
}
