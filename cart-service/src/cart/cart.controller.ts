import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CartsService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateCartDto, ListCartDto, UpdateCartDto } from './dto/cart.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getListCart(@Query() query: ListCartDto) {
    const carts = await this.cartsService.getAll(query);
    return SendResponse.success(carts, 'Get list carts successful')
  }

  @Post()
  async addToCart(@Body() body: CreateCartDto) {
    const cart = await this.cartsService.create(body);
    return SendResponse.success(cart, 'Create cart successful')
  }

  @Put(':id')
  async updateCart(@Param('id') id: number, @Body() body: UpdateCartDto) {
    const cart = await this.cartsService.update(id, body);
    return SendResponse.success(cart, 'Update cart successful')
  }
}
