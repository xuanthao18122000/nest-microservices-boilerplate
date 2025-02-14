import { ApiProperty } from '@nestjs/swagger';
import {
  CustomerTypeEnum,
  GenderEnum,
} from 'apps/customer-service/src/domain/enums';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationOptions } from '@app/common/utils/pagination-options.util';

export class ListCustomerDto extends PaginationOptions {
  @ApiProperty({ example: '', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    required: false,
    description: 'Giới tính: ' + JSON.stringify(GenderEnum, null, 1),
    enum: GenderEnum,
  })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({
    required: false,
    description: 'Loại khách hàng: ' + JSON.stringify(CustomerTypeEnum, null, 1),
    enum: CustomerTypeEnum,
  })
  @IsOptional()
  @IsEnum(CustomerTypeEnum)
  type: CustomerTypeEnum;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;
}
