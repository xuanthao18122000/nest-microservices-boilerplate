import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  parentId: string;
}
