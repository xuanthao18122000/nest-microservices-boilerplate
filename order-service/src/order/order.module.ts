import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
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
      provide: "PRODUCT_SERVICE",
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_MQ_URL],
            queue: "PRODUCT",
            noAck: false,
            queueOptions: {
              durable: false,
            },
          },
        }),
      inject: [ConfigService],
    },
    {
      provide: "USER_SERVICE",
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_MQ_URL],
            queue: "USER",
            noAck: false,
            queueOptions: {
              durable: false,
            },
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class OrdersModule {}
