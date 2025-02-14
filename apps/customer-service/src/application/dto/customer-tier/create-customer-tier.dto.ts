import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerTierDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  spendingThreshold: number;
}
