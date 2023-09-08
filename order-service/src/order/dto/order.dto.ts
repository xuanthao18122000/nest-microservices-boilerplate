import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CustomBaseFilter } from "src/common/share/custom-base.filter";

export class ListOrderDto extends CustomBaseFilter {

}

export class CreateOrderDto {
  @Expose()
  @ApiProperty({ type: 'array'})
  @IsArray()
  @Type(() => Array)
  @ValidateNested({ each: true })
  cart: CreateOrder[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note: string;
}

export class CreateOrder {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderPhone: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  deliveryAddressId: string;
}

export class UpdateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;
}
