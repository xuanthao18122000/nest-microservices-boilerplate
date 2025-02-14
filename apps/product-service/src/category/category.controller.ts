import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách danh mục' })
  getAll() {
    return this.categoryService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo danh mục' })
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết danh mục' })
  getOne(@Param('id') id: string) {
    return this.categoryService.getOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.update(id, body);
  }
}
