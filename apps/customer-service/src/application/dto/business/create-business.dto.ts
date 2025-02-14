import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  taxCode: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  note: string;
}
