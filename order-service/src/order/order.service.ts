import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Order } from 'src/database/schema';
import { Repository } from 'typeorm';
import { CreateOrderDto, ListOrderDto, UpdateOrderDto } from './dto/order.dto';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async getAll(query: ListOrderDto) {
    const { page, perPage } = query;
    const [list, total] = await this.orderRepo
      .createQueryBuilder('order')
      .getManyAndCount();

    return { list, total, page: page/1, perPage: perPage/1 };
  }

  async getOne(id: number): Promise<Order | any> {
    const order = await this.findOrderByPk(id);
    return order.serialize();
  }

  async create(body: CreateOrderDto) {
    const { } = body;

    return await this.orderRepo.save({
      status: 1,
    });
  }

  async update(id: number, body: UpdateOrderDto): Promise<Order> {
    const {  } = body;
    const order = await this.findOrderByPk(id);
    // if(name) order.name = name;

    return await this.orderRepo.save(order);
  }

  async findOrderByPk(id: number): Promise<Order>{
    const order = await this.orderRepo.findOneBy({ id });
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
