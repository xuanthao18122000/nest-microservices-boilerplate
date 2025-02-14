import { Injectable, NotFoundException } from '@nestjs/common';
import { StockSlip } from 'apps/inventory-service/src/domain/entities/stock-slip.entity';
import { IStockSlipRepository } from 'apps/inventory-service/src/domain/interfaces/stock-slip-repository.interface';

@Injectable()
export class GetOneStockSlipUseCase {
  constructor(private readonly stockSlipRepository: IStockSlipRepository) {}

  async execute(options: FindOneOptions<StockSlip>): Promise<StockSlip> {
    const stockSlip = await this.stockSlipRepository.findOne(criteria);

    if (!stockSlip) {
      throw new NotFoundException('Không tìm thấy phiếu!');
    }

    return stockSlip;
  }
}
