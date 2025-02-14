import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  key: string;
}
