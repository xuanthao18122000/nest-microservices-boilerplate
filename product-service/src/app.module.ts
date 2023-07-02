import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { dataSourceOptions } from './common/configs/typeorm.config';
import { ProductsModule } from './product/product.module';
import { CategoriesModule } from './category/category.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
			...dataSourceOptions,
		}),
    ScheduleModule.forRoot(),
    ProductsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
