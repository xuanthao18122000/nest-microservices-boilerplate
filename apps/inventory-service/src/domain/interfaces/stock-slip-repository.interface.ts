import { ListStockSlipDto } from 'apps/inventory-service/src/application/dto/stock-slip/list-stock-slip.dto';
import { StockSlip } from 'apps/inventory-service/src/domain/entities/stock-slip.entity';

export abstract class IStockSlipRepository {
  abstract create(stockSlip: Partial<StockSlip>): StockSlip;
  abstract save(stockSlip: StockSlip): Promise<StockSlip>;
  abstract getManyAndCount(
    listStockSlipDto: ListStockSlipDto,
  ): Promise<[StockSlip[], number]>;
  abstract findById(id: number): Promise<StockSlip>;
  abstract findOne(options: FindOneOptions<StockSlip>): Promise<StockSlip>;
}
