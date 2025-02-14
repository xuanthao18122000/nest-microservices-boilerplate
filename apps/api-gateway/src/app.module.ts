import { Module } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway.module';

@Module({
  imports: [
    ApiGatewayModule.register({
      routes: [
        {
          prefix: '/users',
          target: 'http://localhost:3000',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
        {
          prefix: '/products',
          target: 'http://localhost:3001',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
        {
          prefix: '/customers',
          target: 'http://localhost:3002',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
        {
          prefix: '/inventory',
          target: 'http://localhost:3003',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        },
        // Add more route configurations as needed
      ],
    }),
  ],
})
export class AppModule {}