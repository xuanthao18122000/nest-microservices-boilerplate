import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStockSlipDto } from '../../dto/stock-slip/update-stock-slip.dto';
import { StockSlip } from 'apps/inventory-service/src/domain/entities/stock-slip.entity';
import { IStockSlipRepository } from 'apps/inventory-service/src/domain/interfaces/stock-slip-repository.interface';

@Injectable()
export class UpdateStockSlipUseCase {
  constructor(private readonly stockSlipRepository: IStockSlipRepository) {}

  async execute(
    id: number,
    updateStockSlipDto: UpdateStockSlipDto,
  ): Promise<StockSlip> {
    const stockSlip = await this.stockSlipRepository.findById(id);

    if (!stockSlip) {
      throw new NotFoundException('Không tìm thấy');
    }

    Object.assign(stockSlip, updateStockSlipDto);

    return this.stockSlipRepository.save(stockSlip);
  }
}
