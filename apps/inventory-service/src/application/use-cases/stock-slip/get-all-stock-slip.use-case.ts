import { Injectable } from '@nestjs/common';
import { ListStockSlipDto } from '../../dto/stock-slip/list-stock-slip.dto';
import { StockSlip } from 'apps/inventory-service/src/domain/entities/stock-slip.entity';
import { IStockSlipRepository } from 'apps/inventory-service/src/domain/interfaces/stock-slip-repository.interface';

@Injectable()
export class GetAllStockSlipUseCase {
  constructor(private readonly stockSlipRepository: IStockSlipRepository) {}

  async execute(
    listStockSlipDto: ListStockSlipDto,
  ): Promise<[StockSlip[], number]> {
    return this.stockSlipRepository.getManyAndCount(listStockSlipDto);
  }
}
