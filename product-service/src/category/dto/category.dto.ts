import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CustomBaseFilter } from "src/common/share/custom-base.filter";

export class ListCategoryDto extends CustomBaseFilter {

}

export class CreateCategoryDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  name: string;

}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  status: number;

}