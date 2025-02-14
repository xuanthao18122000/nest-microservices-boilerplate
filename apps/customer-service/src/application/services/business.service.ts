import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from '../dto/business/create-business.dto';
import { UpdateBusinessDto } from '../dto/business/update-business.dto';
import { ListBusinessDto } from '../dto/business/list-business.dto';
import { GetAllBusinessUseCase } from '../use-cases/business/get-all-business.use-case';
import { GetOneBusinessUseCase } from '../use-cases/business/get-one-business.use-case';
import { CreateBusinessUseCase } from '../use-cases/business/create-business.use-case';
import { UpdateBusinessUseCase } from '../use-cases/business/update-business.use-case';

@Injectable()
export class BusinessService {
  constructor(
    private readonly getAllBusinessUseCase: GetAllBusinessUseCase,
    private readonly getOneBusinessUseCase: GetOneBusinessUseCase,
    private readonly createBusinessUseCase: CreateBusinessUseCase,
    private readonly updateBusinessUseCase: UpdateBusinessUseCase,
  ) {}

  async createBusiness(createBusinessDto: CreateBusinessDto) {
    return this.createBusinessUseCase.execute(createBusinessDto);
  }

  async updateBusiness(id: number, updateBusinessDto: UpdateBusinessDto) {
    return this.updateBusinessUseCase.execute(id, updateBusinessDto);
  }

  async getBusinessById(id: number) {
    return this.getOneBusinessUseCase.execute({ id });
  }

  async getAllBusiness(listBusinessDto: ListBusinessDto) {
    return this.getAllBusinessUseCase.execute(listBusinessDto);
  }
}
