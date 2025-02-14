import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ProviderTypeEnum } from '../../enums/provider.enum';

export class UpdateProviderDto {
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
  address?: string;
}
