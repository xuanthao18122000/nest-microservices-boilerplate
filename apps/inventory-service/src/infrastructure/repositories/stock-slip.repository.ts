import { Injectable } from '@nestjs/common';
import { StockSlip } from '../../domain/entities/stock-slip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListStockSlipDto } from '../../application/dto/stock-slip/list-stock-slip.dto';
import { IStockSlipRepository } from '../../domain/interfaces/stock-slip-repository.interface';

@Injectable()
export class StockSlipRepository implements IStockSlipRepository {
  @InjectRepository(StockSlip)
  private readonly stockSlipRepo: Repository<StockSlip>;

  create(stockSlip: Partial<StockSlip>) {
    return this.stockSlipRepo.create(stockSlip);
  }

  save(stockSlip: StockSlip): Promise<StockSlip> {
    return this.stockSlipRepo.save(stockSlip);
  }

  getManyAndCount(query: ListStockSlipDto): Promise<[StockSlip[], number]> {
    const filterBuilder = this.stockSlipRepo
      .fCreateFilterBuilder('stockSlip', query)
      .fAndWhereLikeString('fullName')
      .fAndWhere('status')
      .fAndWhere('creatorId')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findById(id: number): Promise<StockSlip> {
    return this.stockSlipRepo.findOneBy({ id });
  }

  findOne(options: FindOneOptions<StockSlip>): Promise<StockSlip> {
    return this.stockSlipRepo.findOneBy(criteria);
  }
}
