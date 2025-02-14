import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: '' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: '' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  categoryId: string;
}
