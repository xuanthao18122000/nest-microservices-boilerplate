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
  providers: [
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = process.env.USER_RABBIT;
        const password = process.env.PASSWORD_RABBIT;
        const host = process.env.HOST_RABBIT;
        const port = process.env.PORT_RABBIT;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: 'PRODUCT_QUEUE',
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    CartsService
  ],
})
export class CartsModule {}
