import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import FilterBuilderService from 'src/common/filter-builder/filter-builder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        transport: Transport.RMQ,
        name: 'USER_SERVICE',
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'USER',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, FilterBuilderService],
})
export class UsersModule {}
