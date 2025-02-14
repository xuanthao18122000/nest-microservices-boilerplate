import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateBusinessDto {
  @ApiProperty({ example: '', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  taxCode: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  note: string;
}
