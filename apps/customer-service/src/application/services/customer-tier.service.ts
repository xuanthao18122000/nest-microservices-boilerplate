import { Injectable } from '@nestjs/common';
import { CreateCustomerTierDto } from '../dto/customer-tier/create-customer-tier.dto';
import { UpdateCustomerTierDto } from '../dto/customer-tier/update-customer-tier.dto';
import { ListCustomerTierDto } from '../dto/customer-tier/list-customer-tier.dto';
import { GetAllCustomerTierUseCase } from '../use-cases/customer-tier/get-all-customer-tier.use-case';
import { GetOneCustomerTierUseCase } from '../use-cases/customer-tier/get-one-customer-tier.use-case';
import { CreateCustomerTierUseCase } from '../use-cases/customer-tier/create-customer-tier.use-case';
import { UpdateCustomerTierUseCase } from '../use-cases/customer-tier/update-customer-tier.use-case';
import { User } from 'apps/user-service/src/domain/entities/user.entity';

@Injectable()
export class CustomerTierService {
  constructor(
    private readonly getAllCustomerTierUseCase: GetAllCustomerTierUseCase,
    private readonly getOneCustomerTierUseCase: GetOneCustomerTierUseCase,
    private readonly createCustomerTierUseCase: CreateCustomerTierUseCase,
    private readonly updateCustomerTierUseCase: UpdateCustomerTierUseCase,
  ) {}

  async createCustomerTier(createCustomerTierDto: CreateCustomerTierDto, user: User) {
    return this.createCustomerTierUseCase.execute(createCustomerTierDto, user);
  }

  async updateCustomerTier(
    id: number,
    updateCustomerTierDto: UpdateCustomerTierDto,
  ) {
    return this.updateCustomerTierUseCase.execute(id, updateCustomerTierDto);
  }

  async getCustomerTierById(id: number) {
    return this.getOneCustomerTierUseCase.execute({ id });
  }

  async getAllCustomerTiers(listCustomerTierDto: ListCustomerTierDto) {
    return this.getAllCustomerTierUseCase.execute(listCustomerTierDto);
  }
}
