import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: '' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ example: '' })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ example: '' })
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @ApiProperty({ example: '' })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
  
    @ApiProperty({ example: 0 })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    roleId: number;
  
    @ApiProperty({ example: '', required: false })
    @IsString()
    @IsOptional()
    avatar: string;
  
    @ApiProperty({ example: '' })
    @IsString()
    @IsOptional()
    address: string;
  }