import { PaginationOptions } from '@app/common/utils/pagination-options.util';
import { ApiProperty } from '@nestjs/swagger';
import { StoreTypeEnum } from 'apps/inventory-service/src/domain/enums';
import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';

export class ListStoreDto extends PaginationOptions {
  @ApiProperty({ example: 'Store A' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'SA', required: false })
  @IsString()
  @IsOptional()
  shortName: string;

  @ApiProperty({ example: '123 Main Street', required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: 'SC001', required: false })
  @IsString()
  @IsOptional()
  siteCode: string;

  @ApiProperty({ example: 'SH001', required: false })
  @IsString()
  @IsOptional()
  shipCode: string;

  @ApiProperty({ example: '0987654321', required: false })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: 106.865036, required: false })
  @IsNumber({}, { message: 'Longitude must be a number' })
  @IsOptional()
  longitude: number;

  @ApiProperty({ example: 10.762622, required: false })
  @IsNumber({}, { message: 'Latitude must be a number' })
  @IsOptional()
  latitude: number;

  @ApiProperty({
    required: false,
    description: 'Loại khách hàng: ' + JSON.stringify(StoreTypeEnum, null, 1),
    enum: StoreTypeEnum,
  })
  @IsOptional()
  @IsEnum(StoreTypeEnum)
  type: StoreTypeEnum;
}
