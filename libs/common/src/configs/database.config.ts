import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '../loggers/logger.service';
import { getEnv } from './env.config';

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
  entities: [join(__dirname, '..', '/database/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', '/database/migrations/*.{js,ts}')],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
