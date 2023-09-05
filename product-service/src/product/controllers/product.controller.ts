import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from '../services/product.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateProductDto, ListProductDto, UpdateProductDto } from '../dto/product.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('products')
@ApiTags('[USER] Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('by-category/:id')
  @Public()
  async getProductsByCategory(@Param('id') id: number, @Query() query: ListProductDto) {
    const products = await this.productsService.productsByCategory(id, query);
    return SendResponse.success(products, 'Get all products by category successful')
  }

  @Get('detail/:id')
  @Public()
  async getDetailsProduct(@Param('id') id: number) {
    const product = await this.productsService.getOne(id);
    return SendResponse.success(product, 'Get detail product successful')
  }

  @Get()
  async getAllProducts(@Query() query: ListProductDto) {
    const products = await this.productsService.getAll(query);
    return SendResponse.success(products, 'Get all products successful')
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: number) {
    const product = await this.productsService.getOne(id);
    return SendResponse.success(product, 'Get detail product successful')
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productsService.create(body);
    return SendResponse.success([], 'Create product successful')
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    const product = await this.productsService.update(id, body);
    return SendResponse.success([], 'Update product successful')
  }
}
