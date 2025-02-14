import { ApiProperty } from '@nestjs/swagger';
import {
  CustomerTypeEnum,
  GenderEnum,
} from 'apps/customer-service/src/domain/enums';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateStockSlipDto {
  attachments: string[]
}
