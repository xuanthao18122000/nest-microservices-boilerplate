import { Module } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    // ClientsModule.register([
    //   {
    //     transport: Transport.RMQ,
    //     name: 'CATEGORY_SERVICE',
    //     options: {
    //       urls: [process.env.RABBIT_MQ_URL],
    //       queue: 'CATEGORY',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
