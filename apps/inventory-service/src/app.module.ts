import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@app/common/configs/database.config';
import { StockSlipModule } from './stock-slip.module';
import { StoreModule } from './store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    StockSlipModule,
    StoreModule,
  ],
})
export class AppModule {}
