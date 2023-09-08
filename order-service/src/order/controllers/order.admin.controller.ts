import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateOrderDto, ListOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersAdminService } from '../services/order.admin.service';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersAdminService: OrdersAdminService) {}

  @Get()
  async getAllOrders(@Query() query: ListOrderDto) {
    const orders = await this.ordersAdminService.getAll(query);
    return SendResponse.success(orders, 'Get all orders successful');
  }

  @Get(':id')
  async getOneOrder(@Param('id') id: number) {
    const order = await this.ordersAdminService.getOne(id);
    return SendResponse.success(order, 'Get detail order successful');
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    const order = await this.ordersAdminService.create(body);
    return SendResponse.success([], 'Create order successful');
  }

  @Put()
  async updateOrder(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    const order = await this.ordersAdminService.update(id, body);
    return SendResponse.success([], 'Update order successful');
  }
}
