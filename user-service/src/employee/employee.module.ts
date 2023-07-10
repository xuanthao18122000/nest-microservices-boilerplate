import { Module } from '@nestjs/common';
import { EmployeesController } from './employee.controller';
import { EmployeesService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, User } from 'src/database/schema';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    ClientsModule.register([
      {
        transport: Transport.RMQ,
        name: 'EMPLOYEE_SERVICE',
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'EMPLOYEE',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
