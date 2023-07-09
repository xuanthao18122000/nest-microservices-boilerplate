import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Order, OrderDetail } from 'src/database/schema';
import { Repository } from 'typeorm';
import { CreateOrderDto, ListOrderDetailsDto, UpdateOrderDto } from './dto/order-detail.dto';
@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepo: Repository<OrderDetail>,
  ) {}

  async getAll(query: ListOrderDetailsDto) {
    const { page, perPage } = query;
    const [list, total] = await this.orderDetailsRepo
      .createQueryBuilder('order')
      .getManyAndCount();

    return { list, total, page: page/1, perPage: perPage/1 };
  }

  async getOne(id: number): Promise<OrderDetail | any> {
    const order = await this.findOrderByPk(id);
    return order.serialize();
  }

  async create(body: CreateOrderDto) {
    const { } = body;

    return await this.orderDetailsRepo.save({
      status: 1,
    });
  }

  async update(id: number, body: UpdateOrderDto): Promise<OrderDetail> {
    const {  } = body;
    const order = await this.findOrderByPk(id);
    // if(name) order.name = name;

    return await this.orderDetailsRepo.save(order);
  }

  async findOrderByPk(id: number): Promise<OrderDetail>{
    const order = await this.orderDetailsRepo.findOneBy({ id });
    if (!order) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['ORDER_NOT_FOUND'].code,
        code['ORDER_NOT_FOUND'].type,
      );
    }
    return order
  }
}
