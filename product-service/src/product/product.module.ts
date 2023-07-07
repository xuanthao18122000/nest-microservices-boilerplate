import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    // ClientsModule.register([
    //   {
    //     transport: Transport.RMQ,
    //     name: 'PRODUCT_SERVICE',
    //     options: {
    //       urls: [process.env.RABBIT_MQ_URL],
    //       queue: 'PRODUCT',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
