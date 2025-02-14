import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PaginationOptions } from '@app/common/utils/pagination-options.util';

export class ListBusinessDto extends PaginationOptions {
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
