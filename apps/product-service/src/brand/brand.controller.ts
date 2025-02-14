import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListBrandDto } from './dto/list-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách thương hiệu' })
  getAll(@Query() query: ListBrandDto) {
    return this.brandService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo thương hiệu' })
  create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết thương hiệu' })
  getOne(@Param('id') id: string) {
    return this.brandService.getOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thương hiệu' })
  update(@Param('id') id: string, @Body() body: UpdateBrandDto) {
    return this.brandService.update(id, body);
  }
}
