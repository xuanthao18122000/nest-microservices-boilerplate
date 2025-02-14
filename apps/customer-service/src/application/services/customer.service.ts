import { Injectable } from '@nestjs/common';
import { GetAllCustomerUseCase } from '../use-cases/customer/get-all-customer.use-case';
import { GetOneCustomerUseCase } from '../use-cases/customer/get-one-customer.use-case';
import { CreateCustomerUseCase } from '../use-cases/customer/create-customer.use-case';
import { UpdateCustomerUseCase } from '../use-cases/customer/update-customer.use-case';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';
import { ListCustomerDto } from '../dto/customer/list-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly getAllCustomerUseCase: GetAllCustomerUseCase,
    private readonly getOneCustomerUseCase: GetOneCustomerUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createCustomerDto);
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.updateCustomerUseCase.execute(id, updateCustomerDto);
  }

  async getCustomerById(id: number) {
    return this.getOneCustomerUseCase.execute({ id });
  }

  async getAllCustomers(listCustomerDto: ListCustomerDto) {
    return this.getAllCustomerUseCase.execute(listCustomerDto);
  }

  async getStatistics() {}
}
