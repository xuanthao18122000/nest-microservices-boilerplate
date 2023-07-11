import { Module } from '@nestjs/common';
import { CartsController } from './cart.controller';
import { CartsService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { CartItem } from 'src/database/schema/cart-item.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
