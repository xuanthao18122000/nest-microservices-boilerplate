import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsObject, IsString, Min, IsEnum, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrder } from '../enums/query.enum'
import { IQueryBuilder } from '../interfaces';

export class CustomBaseFilter {
  @ApiProperty({
    description: '( Page > 0 )',
    example: 1,
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Page must be greater than 0' })
  page: number;

  @ApiProperty({
    description: '( perPage > 0 )',
    example: 10,
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'perPage must be greater than 0' })
  perPage: number;

  @ApiProperty({
    description: 'Filter Fields',
    example: { name: '' },
    required: false,
  })
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      return false;
    }
  })
  @IsObject({
    message: 'Invalid filter',
  })
  @IsOptional()
  filter: IQueryBuilder;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort must be either "ASC" or "DESC"' })
  sort: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  getFull: boolean;
}
