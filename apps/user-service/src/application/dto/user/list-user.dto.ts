import { PaginationOptions } from "@app/common/utils/pagination-options.util";
import { ApiProperty } from "@nestjs/swagger";
import { UserStatusEnum } from "apps/user-service/src/domain/enums";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class ListUserDto extends PaginationOptions {
    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    id?: number;
  
    @ApiProperty({ required: false, description: 'User name' })
    @IsString()
    @IsOptional()
    fullName?: string;
  
    @ApiProperty({ required: false, description: 'Email' })
    @IsString()
    @IsOptional()
    email?: string;
  
    @ApiProperty({ required: false, description: 'Phone number' })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    phoneNumber?: string;
  
    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    roleId?: number;
  
    @ApiProperty({
      required: false,
      description: 'Status = ' + JSON.stringify(UserStatusEnum, null, 1),
      enum: UserStatusEnum,
    })
    @IsOptional()
    @Type(() => Number)
    @IsEnum(UserStatusEnum)
    status?: number;
  
    @ApiProperty({
      type: 'string',
      format: 'date',
      description: 'Created from (YYYY/mm/dd hh:mm:ss)',
      required: false,
    })
    @Type(() => Date)
    @IsOptional()
    createdDateFrom?: Date;
  
    @ApiProperty({
      type: 'string',
      format: 'date',
      description: 'Created to (YYYY/mm/dd hh:mm:ss)',
      required: false,
    })
    @Type(() => Date)
    @IsOptional()
    createdDateTo?: Date;
  }