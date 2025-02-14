import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Email',
    required: true,
    type: 'string',
    example: '',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Họ tên',
    required: true,
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Họ tên',
    required: true,
    type: 'string',
    example: '',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Số điện thoại',
    required: true,
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Mật khẩu',
    type: 'string',
    required: true,
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
