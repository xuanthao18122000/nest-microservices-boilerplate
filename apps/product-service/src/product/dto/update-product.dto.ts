import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  name: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  code: string;

  @ApiProperty({ example: '' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price: string;

  @ApiProperty({ example: '' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  categoryId: string;
}
