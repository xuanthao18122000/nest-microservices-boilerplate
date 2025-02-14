import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsNotEmpty()
  name: string;
}
