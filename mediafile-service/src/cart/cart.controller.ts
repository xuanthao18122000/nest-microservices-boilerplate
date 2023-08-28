import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CartsService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateCartDto, ListCartDto, UpdateCartDto } from './dto/cart.dto';
import { Request } from 'express';

@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getListCart(@Query() query: ListCartDto) {
    const carts = await this.cartsService.getCarts(query);
    return SendResponse.success(carts, 'Get list carts successful')
  }

  @Post()
  async addToCart(@Body() body: CreateCartDto, @Req() req: Request) {
    const userId = req['user']?.id
    const cart = await this.cartsService.create(userId, body);
    return SendResponse.success(cart, 'Create cart successful')
  }

  @Put(':id')
  async updateCart(@Param('id') id: number, @Body() body: UpdateCartDto) {
    const cart = await this.cartsService.update(id, body);
    return SendResponse.success(cart, 'Update cart successful')
  }
}
