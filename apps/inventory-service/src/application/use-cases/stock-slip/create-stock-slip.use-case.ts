import { Injectable } from '@nestjs/common';
import { CreateStockSlipDto } from '../../dto/stock-slip/create-stock-slip.dto';
import { StockSlip } from 'apps/inventory-service/src/domain/entities/stock-slip.entity';
import { IStockSlipRepository } from 'apps/inventory-service/src/domain/interfaces/stock-slip-repository.interface';

@Injectable()
export class CreateStockSlipUseCase {
  constructor(private readonly stockSlipRepository: IStockSlipRepository) {}

  async execute(createStockSlipDto: CreateStockSlipDto): Promise<StockSlip> {
    const stockSlip = this.stockSlipRepository.create(createStockSlipDto);

    return this.stockSlipRepository.save(stockSlip);
  }
}
