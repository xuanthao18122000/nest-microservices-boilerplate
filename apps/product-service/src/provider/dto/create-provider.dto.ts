import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ProviderTypeEnum } from '../../enums/provider.enum';

export class CreateProviderDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  taxNo: string;

  @ApiProperty({
    required: false,
    description: 'Status = ' + JSON.stringify(ProviderTypeEnum, null, 1),
    enum: ProviderTypeEnum,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsEnum(ProviderTypeEnum)
  type: number;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  address: string;
}
