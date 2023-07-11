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
      queue: 'ORDER_QUEUE',
      queueOptions: {
        durable: true,
      },
    },
  };

  app.connectMicroservice(microserviceOptions);

  const config = new DocumentBuilder()
    .setTitle('Orders Microservice')
    .setDescription('API description for Orders Microservice')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('order/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(3003);
}

bootstrap();

// import { NestFactory, RouterModule } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { AppModule } from './app.module';
// import { Logger, VersioningType } from '@nestjs/common';
// import { cfg } from './common/configs/env.config';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { Routes } from './routes';
// import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     logger: ["log", "error", "debug", "verbose", "warn", "error"],
//   });

//   const config = new DocumentBuilder()
//     .setTitle('Orders Microservices')
//     .setDescription('The Orders Microservices API description')
//     .setVersion('1.6.0')
//     .addServer(cfg('APP_PUBLIC_ENDPOINT'))
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('docs', app, document);

//   app.enableVersioning({
//     type: VersioningType.URI,
//   });
//   app.enableCors({
//     allowedHeaders: "*",
//     origin: "*",
//     credentials: true,
//   });

//   const user = process.env.USER_RABBIT;
//   const password = process.env.PASSWORD_RABBIT;
//   const host = process.env.HOST_RABBIT;
//   const port = process.env.PORT_RABBIT;

//   await app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.RMQ,
//     options: {
//       urls: [`amqp://${user}:${password}@${host}:${port}`],
//       queue: 'ORDER_QUEUE',
//       queueOptions: {
//         durable: true,
//       },
//     },
//   });
  

//   RouterModule.register(Routes)
//   await app.startAllMicroservices();
//   // await app.listen(cfg('PORT') || 3004, () => {
//   //   Logger.log(
//   //     `Server running on http://localhost:${cfg('PORT')}\n`,
//   //   );
//   // });
// }
// bootstrap();
