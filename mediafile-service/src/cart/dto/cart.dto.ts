import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CustomBaseFilter } from 'src/common/share/custom-base.filter';

export class ListCartDto extends CustomBaseFilter {}

export class CreateCartDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}

export class UpdateCartDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class Product {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}
