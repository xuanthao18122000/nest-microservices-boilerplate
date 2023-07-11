import { Module } from '@nestjs/common';
import { OrderDetailsController } from './order-detail.controller';
import { OrderDetailsService } from './order-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
    ClientsModule.register([
      {
        transport: Transport.RMQ,
        name: 'ORDER_DETAIL_SERVICE',
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'ORDER_DETAIL',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrderDetailsController],
  providers: [
    OrderDetailsService,
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
export class OrderDetailsModule {}
