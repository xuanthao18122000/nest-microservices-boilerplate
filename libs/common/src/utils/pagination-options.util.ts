import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class PaginationOptions {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Page you want to display',
  })
  @Type(() => Number)
  @IsOptional()
  @ValidateIf((o) => typeof o.page === 'number')
  @IsNumber()
  @Min(1, { message: 'Page must be greater than 0' })
  page?: number = 1;

  @ApiProperty({
    example: 10,
    required: false,
    description: 'Number of records per page',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'perPage must be greater than 0' })
  perPage?: number = 10;

  @ApiProperty({ enum: ['DESC', 'ASC'], required: false })
  @IsEnum(['DESC', 'ASC'])
  @IsOptional()
  sort?: ['DESC', 'ASC'];

  @ApiProperty({ required: false, description: 'Get all records' })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  getFull?: boolean = false;
}
