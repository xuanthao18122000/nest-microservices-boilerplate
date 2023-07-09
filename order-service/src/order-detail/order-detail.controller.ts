import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrderDetailsService } from './order-detail.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateOrderDto, ListOrderDetailsDto, UpdateOrderDto } from './dto/order-detail.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  async getAllOrderDetails(@Query() query: ListOrderDetailsDto) {
    const orders = await this.orderDetailsService.getAll(query);
    return SendResponse.success(orders, 'Get all orders successful')
  }

  @Get(':id')
  async getOneOrderDetails(@Param('id') id: number) {
    const order = await this.orderDetailsService.getOne(id);
    return SendResponse.success(order, 'Get detail order successful')
  }

}
