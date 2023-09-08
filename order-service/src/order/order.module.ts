import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/order.controller';
import { OrdersService } from './services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderDetail } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    ClientsModule.register([
      {
        transport: Transport.RMQ,
        name: 'ORDER_SERVICE',
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'ORDER',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = process.env.USER_RABBIT;
        const password = process.env.PASSWORD_RABBIT;
        const host = process.env.HOST_RABBIT;
        const port = process.env.PORT_RABBIT;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: 'USER_QUEUE',
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
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
  ],
})
export class OrdersModule {}
