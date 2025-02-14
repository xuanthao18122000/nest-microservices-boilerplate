import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getEnv } from '@app/common/configs/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  if (getEnv('PRODUCT_NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('PRODUCT SERVICE API')
      .setDescription('PRODUCT SERVICE API description')
      .addServer(getEnv('PRODUCT_PUBLIC_ENDPOINT'))
      .setVersion('0.1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
  }

  await app.startAllMicroservices();
  await app
    .listen(getEnv('PRODUCT_PORT', Number))
    .then(() =>
      console.table({
        'PRODUCT SERVICE ': {
          URL: getEnv('PRODUCT_PUBLIC_ENDPOINT'),
          database: 'mongodb',
        },
      }),
    );
}
bootstrap();
