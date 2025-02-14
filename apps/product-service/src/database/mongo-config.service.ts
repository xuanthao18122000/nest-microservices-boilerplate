import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';
import { getEnv } from '../../../../libs/common/src/configs/env.config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor() {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: getEnv('DB_PRODUCT_URI'),
      dbName: getEnv('DB_PRODUCT_DB_NAME'),
      user: getEnv('DB_PRODUCT_USER'),
      pass: getEnv('DB_PRODUCT_PASS'),
      connectionFactory(connection) {
        connection.plugin(mongooseAutoPopulate);
        return connection;
      },
    };
  }
}