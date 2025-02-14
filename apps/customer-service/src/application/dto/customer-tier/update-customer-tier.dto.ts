import { ApiProperty } from '@nestjs/swagger';
import { CustomerTierStatusEnum } from 'apps/customer-service/src/domain/enums';
import { IsEmail, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerTierDto {
  @ApiProperty({ example: '', required: false })
  @IsEmail()
  @IsOptional()
  name: string;

  @ApiProperty({ example: '', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  spendingThreshold: number;

  @ApiProperty({
    required: false,
    description:
      'Trạng thái: ' + JSON.stringify(CustomerTierStatusEnum, null, 1),
    enum: CustomerTierStatusEnum,
  })
  @IsOptional()
  @IsEnum(CustomerTierStatusEnum)
  status: CustomerTierStatusEnum;
}
