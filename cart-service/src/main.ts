import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const user = process.env.USER_RABBIT;
  const password = process.env.PASSWORD_RABBIT;
  const host = process.env.HOST_RABBIT;
  const port = process.env.PORT_RABBIT;

  const microserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}:${port}`],
      queue: 'PRODUCT_QUEUE',
      queueOptions: {
        durable: true,
      },
    },
  };

  app.connectMicroservice(microserviceOptions);

  const config = new DocumentBuilder()
    .setTitle('Products Microservice')
    .setDescription('API description for Products Microservice')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('product/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(3003);
}

bootstrap();