import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateCategoryDto, ListCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(@Query() query: ListCategoryDto) {
    const categories = await this.categoriesService.getAll(query);
    return SendResponse.success(categories, 'Get all categories successful')
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: number) {
    const category = await this.categoriesService.getOne(id);
    return SendResponse.success(category, 'Get detail category successful')
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const category = await this.categoriesService.create(body);
    return SendResponse.success([], 'Create category successful')
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    const category = await this.categoriesService.update(id, body);
    return SendResponse.success([], 'Update category successful')
  }
}
