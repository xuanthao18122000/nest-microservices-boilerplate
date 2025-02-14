import { PaginationOptions } from '@app/common/utils/pagination-options.util';
import { ApiProperty } from '@nestjs/swagger';
import { RoleStatusEnum } from 'apps/user-service/src/domain/enums';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListRoleDto extends PaginationOptions {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false, description: 'Role name' })
  @IsString()
  @IsOptional()
  name?: string;

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
