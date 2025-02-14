import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@app/common/configs/database.config';
import { CustomerModule } from './customer.module';
import { CustomerTierModule } from './customer-tier.module';
import { BusinessModule } from './business.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    CustomerModule,
    CustomerTierModule,
    BusinessModule,
  ],
})
export class AppModule {}
