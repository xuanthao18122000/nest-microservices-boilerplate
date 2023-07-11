import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { dataSourceOptions } from './common/configs/typeorm.config';
import { OrdersModule } from './order/order.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrderDetailsModule } from './order-detail/order-detail.module';
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
    OrdersModule,
    OrderDetailsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'ORDER_SERVICE',
      useFactory(configService: ConfigService){

        const user = process.env.USER_RABBIT;
        const password = process.env.PASSWORD_RABBIT;
        const host = process.env.HOST_RABBIT;
        const port = process.env.PORT_RABBIT;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: 'ORDER_QUEUE',
            queueOptions: {
              durable: true,
            },
          }
        })
      }
    },
    
    AppService,
  ],
})
export class AppModule {}
