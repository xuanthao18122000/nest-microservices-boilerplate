import { ApiProperty } from '@nestjs/swagger';
import { RoleStatusEnum } from 'apps/user-service/src/domain/enums';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ example: '' })
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
  status: number;
}
