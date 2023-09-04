import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsObject, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

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
    example: { name: 'Nhan Dang, bp, vn,...' },
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
  filter: Record<string, any> = {};

  @Expose()
  // @ApiProperty({ example: '"ASC" | "DESC"', required: false })
  @IsString()
  // @IsIn(config.SORT_TYPE.value)
  @IsOptional()
  public sort: string;
}
