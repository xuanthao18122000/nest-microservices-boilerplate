import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './user/user.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { cfg } from './common/configs/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true, // 👈
    logger: ["log", "error", "debug", "verbose", "warn", "error"],
  });

  const config = new DocumentBuilder()
    .setTitle('SaleX')
    .setDescription('The SaleX API description')
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

  await app.listen(cfg('PORT') || 3002, () => {
    Logger.log(
      `Server running on http://localhost:${cfg('PORT')}\n`,
    );
  });
}
bootstrap();
