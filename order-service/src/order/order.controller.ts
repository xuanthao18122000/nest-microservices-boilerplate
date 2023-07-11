import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateOrderDto, ListOrderDto, UpdateOrderDto } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,

    ) {}


  @Get()
  async getAllOrders(@Query() query: ListOrderDto) {
    const orders = await this.ordersService.getAll(query);
    return SendResponse.success(orders, 'Get all orders successful')
  }

  @Get(':id')
  async getOneOrder(@Param('id') id: number) {
    const order = await this.ordersService.getOne(id);
    return SendResponse.success(order, 'Get detail order successful')
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    const order = await this.ordersService.create(body);
    return SendResponse.success([], 'Create order successful')
  }

  @Put()
  async updateOrder(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    const order = await this.ordersService.update(id, body);
    return SendResponse.success([], 'Update order successful')
  }
}
