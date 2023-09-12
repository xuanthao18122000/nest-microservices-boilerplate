import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CustomBaseFilter } from "src/common/share/custom-base.filter";

export class ListUserDto extends CustomBaseFilter {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phoneNumber: string;
}

export class CreateUserDto {
    @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @Type(() => Number)
  @IsIn([1,2,3])
  @IsNotEmpty()
  gender: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  phoneNumber: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @Type(() => Number)
  @IsIn([1,2,3])
  @IsNotEmpty()
  gender: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}