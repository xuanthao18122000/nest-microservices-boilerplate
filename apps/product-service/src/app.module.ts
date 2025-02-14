import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongo-config.service';
import { ProviderModule } from './provider/provider.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ProductModule,
    CategoryModule,
    ProviderModule,
    BrandModule,
  ],
})
export class AppModule {}
