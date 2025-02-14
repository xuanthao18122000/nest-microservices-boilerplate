import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
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
    description: 'Mật khẩu',
    type: 'string',
    required: true,
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
