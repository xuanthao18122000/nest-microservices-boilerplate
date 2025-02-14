import { ApiProperty } from '@nestjs/swagger';
import {
  CustomerTypeEnum,
  GenderEnum,
} from 'apps/customer-service/src/domain/enums';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerDto {
  @ApiProperty({ example: 'example@email.com', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'Nguyễn Văn A', required: false })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ example: '0987654321', required: false })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: '123 Đường ABC, TP.HCM', required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    required: false,
    description: 'Giới tính: ' + JSON.stringify(GenderEnum, null, 1),
    enum: GenderEnum,
  })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({
    required: false,
    description:
      'Loại khách hàng: ' + JSON.stringify(CustomerTypeEnum, null, 1),
    enum: CustomerTypeEnum,
  })
  @IsOptional()
  @IsEnum(CustomerTypeEnum)
  type: CustomerTypeEnum;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;
}
