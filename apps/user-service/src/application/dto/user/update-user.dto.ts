import { ApiProperty } from '@nestjs/swagger';
import { UserStatusEnum } from 'apps/user-service/src/domain/enums';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  roleId: number;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    required: false,
    description: 'Status = ' + JSON.stringify(UserStatusEnum, null, 1),
    enum: UserStatusEnum,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(UserStatusEnum)
  status: number;
}
