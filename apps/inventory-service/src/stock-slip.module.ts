import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockSlip } from './domain/entities/stock-slip.entity';
import { StockSlipController } from './application/controllers/stockslip.controller';
import { IStockSlipRepository } from './domain/interfaces/stock-slip-repository.interface';
import { StockSlipService } from './application/services/stockslip.service';
import { CreateStockSlipUseCase } from './application/use-cases/stock-slip/create-stock-slip.use-case';
import { UpdateStockSlipUseCase } from './application/use-cases/stock-slip/update-stock-slip.use-case';
import { GetOneStockSlipUseCase } from './application/use-cases/stock-slip/get-one-stock-slip.use-case';
import { GetAllStockSlipUseCase } from './application/use-cases/stock-slip/get-all-stock-slip.use-case';
import { StockSlipRepository } from './infrastructure/repositories/stock-slip.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StockSlip])],
  controllers: [StockSlipController],
  providers: [
    {
      provide: IStockSlipRepository,
      useClass: StockSlipRepository,
    },
    StockSlipService,
    CreateStockSlipUseCase,
    UpdateStockSlipUseCase,
    GetOneStockSlipUseCase,
    GetAllStockSlipUseCase,
  ],
})
export class StockSlipModule {}
