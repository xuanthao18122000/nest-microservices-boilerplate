import { PaginationOptions } from '@app/common/utils/pagination-options.util';
import { ApiProperty } from '@nestjs/swagger';
import { RoleStatusEnum } from 'apps/user-service/src/domain/enums';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProviderStatusEnum, ProviderTypeEnum } from '../../enums/provider.enum';

export class ListProviderDto extends PaginationOptions {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  taxNo?: string;

  @ApiProperty({
    required: false,
    description: 'Status = ' + JSON.stringify(ProviderTypeEnum, null, 1),
    enum: ProviderTypeEnum,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ProviderTypeEnum)
  type?: number;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  address: string;

  @ApiProperty({
    required: false,
    description: 'Status = ' + JSON.stringify(ProviderStatusEnum, null, 1),
    enum: ProviderStatusEnum,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ProviderStatusEnum)
  status?: number;
}
