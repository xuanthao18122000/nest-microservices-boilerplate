import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { RoleModule } from './role.module';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { getEnv } from '@app/common/configs/env.config';
import { Logger } from '@app/common/loggers/logger.service';
import { User } from './domain/entities/user.entity';
import { Role } from './domain/entities/role.entity';
import { LoggerModule } from '@app/common/loggers/logger.module';

export const dataSourceOptions: DataSourceOptions = {
  type: getEnv('DB_USER_DRIVER'),
  host: getEnv('DB_USER_HOST'),
  port: getEnv('DB_USER_PORT', Number),
  username: getEnv('DB_USER_USERNAME'),
  password: getEnv('DB_USER_PASSWORD'),
  database: getEnv('DB_USER_DATABASE'),
  logging: true,
  logger: new Logger(),
  synchronize: false,
  migrationsRun: false,
  entities: [User, Role],
  migrations: [join(__dirname, '..', '/database/migrations/*.{js,ts}')],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
