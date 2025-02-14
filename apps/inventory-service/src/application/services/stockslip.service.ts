import { Injectable } from '@nestjs/common';
import { CreateStockSlipDto } from '../dto/stock-slip/create-stock-slip.dto';
import { UpdateStockSlipDto } from '../dto/stock-slip/update-stock-slip.dto';
import { ListStockSlipDto } from '../dto/stock-slip/list-stock-slip.dto';
import { GetAllStockSlipUseCase } from '../use-cases/stock-slip/get-all-stock-slip.use-case';
import { GetOneStockSlipUseCase } from '../use-cases/stock-slip/get-one-stock-slip.use-case';
import { CreateStockSlipUseCase } from '../use-cases/stock-slip/create-stock-slip.use-case';
import { UpdateStockSlipUseCase } from '../use-cases/stock-slip/update-stock-slip.use-case';

@Injectable()
export class StockSlipService {
  constructor(
    private readonly getAllStockSlipUseCase: GetAllStockSlipUseCase,
    private readonly getOneStockSlipUseCase: GetOneStockSlipUseCase,
    private readonly createStockSlipUseCase: CreateStockSlipUseCase,
    private readonly updateStockSlipUseCase: UpdateStockSlipUseCase,
  ) {}

  async createStockSlip(createStockSlipDto: CreateStockSlipDto) {
    return this.createStockSlipUseCase.execute(createStockSlipDto);
  }

  async updateStockSlip(id: number, updateStockSlipDto: UpdateStockSlipDto) {
    return this.updateStockSlipUseCase.execute(id, updateStockSlipDto);
  }

  async getStockSlipById(id: number) {
    return this.getOneStockSlipUseCase.execute({ id });
  }

  async getAllStockSlips(listStockSlipDto: ListStockSlipDto) {
    return this.getAllStockSlipUseCase.execute(listStockSlipDto);
  }

  async getStatistics() {}
}
