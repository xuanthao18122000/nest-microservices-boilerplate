import '@app/common/custom/repository-typeorm.custom';
import '@app/common/custom/select-typeorm.custom';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getEnv } from '@app/common/configs/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  if (getEnv('INVENTORY_NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('INVENTORY SERVICE API')
      .setDescription('INVENTORY SERVICE API description')
      .addServer(getEnv('INVENTORY_PUBLIC_ENDPOINT'))
      .setVersion('0.1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
  }

  await app.startAllMicroservices();

  await app.listen(getEnv('INVENTORY_PORT', Number)).then(() =>
    console.table({
      'INVENTORY SERVICE ': {
        URL: getEnv('INVENTORY_PUBLIC_ENDPOINT'),
        database: getEnv('DB_INVENTORY_USERNAME'),
      },
    }),
  );
}
bootstrap();
