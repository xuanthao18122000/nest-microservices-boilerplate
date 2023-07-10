import { NestFactory, RouterModule } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { cfg } from './common/configs/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Routes } from './routes';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // 👈
    logger: ["log", "error", "debug", "verbose", "warn", "error"],
  });

  const config = new DocumentBuilder()
    .setTitle('Orders Microservices')
    .setDescription('The Orders Microservices API description')
    .setVersion('1.6.0')
    .addServer(cfg('APP_PUBLIC_ENDPOINT'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true,
  });

  const user = process.env.USER_RABBIT;
  const password = process.env.PASSWORD_RABBIT;
  const host = process.env.HOST_RABBIT;
  const port = process.env.PORT_RABBIT;

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}:${port}`],
      queue: 'ORDER_QUEUE',
      queueOptions: {
        durable: true,
      },
    },
  });
  

  RouterModule.register(Routes)
  await app.startAllMicroservices();

}
bootstrap();
