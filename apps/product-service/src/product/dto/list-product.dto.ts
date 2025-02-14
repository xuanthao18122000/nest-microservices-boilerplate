import { PaginationOptions } from '@app/common/utils/pagination-options.util';
import { ApiProperty } from '@nestjs/swagger';
import { RoleStatusEnum } from 'apps/user-service/src/domain/enums';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListProductDto extends PaginationOptions {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false, description: 'Tên sản phẩm' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, description: 'Mã sản phẩm' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: '' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  categoryId: string;

  @ApiProperty({
    required: false,
    description: 'Status = ' + JSON.stringify(RoleStatusEnum, null, 1),
    enum: RoleStatusEnum,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(RoleStatusEnum)
  status?: number;
}
