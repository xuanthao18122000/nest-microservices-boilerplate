import { Module, DynamicModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService, GatewayOptions } from './api-gateway.service';

@Module({})
export class ApiGatewayModule {
  static register(options: GatewayOptions): DynamicModule {
    return {
      module: ApiGatewayModule,
      imports: [HttpModule],
      controllers: [ApiGatewayController],
      providers: [
        {
          provide: 'GATEWAY_OPTIONS',
          useValue: options,
        },
        ApiGatewayService,
      ],
    };
  }
}
