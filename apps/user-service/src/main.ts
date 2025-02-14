import '@app/common/custom/repository-typeorm.custom';
import '@app/common/custom/select-typeorm.custom';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getEnv } from '@app/common/configs/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';
import { rabbitMQConfigUserService } from '@app/common/configs/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(rabbitMQConfigUserService);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  if (getEnv('USER_NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('USER SERVICE API')
      .setDescription('USER SERVICE API description')
      .addServer(getEnv('USER_PUBLIC_ENDPOINT'))
      .setVersion('0.1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
  }

  await app.startAllMicroservices();

  await app.listen(getEnv('USER_PORT', Number)).then(() =>
    console.table({
      'USER SERVICE ': {
        URL: getEnv('USER_PUBLIC_ENDPOINT'),
        database: getEnv('DB_USER_USERNAME'),
      },
    }),
  );
}
bootstrap();
