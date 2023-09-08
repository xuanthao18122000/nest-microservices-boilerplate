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
import { OrdersService } from '../services/order.service';
import { ApiTags } from '@nestjs/swagger';
import { SendResponse } from 'src/common/response/send-response';
import { CreateOrderDto, ListOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(@Query() query: ListOrderDto, @GetUser() user) {
    const orders = await this.ordersService.getAll(query, user?.id);
    return SendResponse.success(orders, 'Get all orders successful');
  }

  @Get(':id')
  async getOneOrder(@Param('id') id: number) {
    const order = await this.ordersService.getOne(id);
    return SendResponse.success(order, 'Get detail order successful');
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    const order = await this.ordersService.create(body);
    return SendResponse.success([], 'Create order successful');
  }

  @Put('cancel')
  async cancelOrder(
    @Param('id') id: number,
    @Body() body: UpdateOrderDto,
    @GetUser() user,
  ) {
    const order = await this.ordersService.cancelOrder(id, body, user);
    return SendResponse.success([], 'Cancel order successful');
  }
}
