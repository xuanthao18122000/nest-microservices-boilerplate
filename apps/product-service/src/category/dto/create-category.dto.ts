import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  parentId: string;
}
