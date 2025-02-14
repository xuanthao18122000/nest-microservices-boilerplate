import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { BrandStatusEnum } from '../../enums/brand.enum';

export class UpdateBrandDto {
  @ApiProperty({ example: '' })
  @IsEmail()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Status = ' + JSON.stringify(BrandStatusEnum, null, 1),
    enum: BrandStatusEnum,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BrandStatusEnum)
  status?: number;
}
