import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Order, OrderDetail } from 'src/database/schema';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateOrderDto, ListOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,

    @Inject('USER_SERVICE')
    private readonly usersService: ClientProxy,

    @Inject('PRODUCT_SERVICE')
    private readonly productsService: ClientProxy,
  ) {}

  getAllUsers(query: ListOrderDto) {
    return this.usersService.send(
      {
        cmd: 'get-all-user',
      },
      query,
    );
  }

  async getAll(query: ListOrderDto, userId: number) {
    const { page, perPage } = query;
    const [list, total] = await this.orderRepo
      .createQueryBuilder('order')
      .where('order.userId = :userId', { userId: -1 })
      .leftJoinAndSelect('order.orderDetails', 'orderDetails  ')
      .getManyAndCount();

    return { list, total, page: +page, perPage: +perPage };
  }

  async getOne(id: number): Promise<Order | any> {
    const order = await this.orderRepo
    .createQueryBuilder('order')
    .where('order.userId = :userId', { userId: -1 })
    .andWhere('order.id = :id', { id })
    .leftJoinAndSelect('order.orderDetails', 'orderDetails')
    .getOne();

    return order.serialize();
  }

  async generateCode() {
    const latestOrder = await this.orderRepo.findOne({
      order: {
        code: 'DESC',
      },
      where: {
        code: Not(IsNull()),
      },
    });
    if (!latestOrder) {
      return '#0001';
    }

    const latestCode = latestOrder.code;
    const codeNumber = parseInt(latestCode.substr(1));
    const nextCodeNumber = codeNumber + 1;
    const code = `#${nextCodeNumber.toString().padStart(4, '0')}`;
    return code;
  }

  async create(body: CreateOrderDto) {
    const { cart, note } = body;

    const code = await this.generateCode();
    const orderData = this.orderRepo.create({
      code,
      orderDate: new Date(),
      note,
      status: 1,
    });
    const order = await this.orderRepo.save(orderData);

    let orderDetails = [];
    for (let item of cart) {
      const data = this.orderDetailRepo.create({
        order: {
          id: order.id,
        },
        productId: item.id,
        quantity: item.quantity,
        status: 1,
      });
      orderDetails.push(data);
    }
    return await this.orderDetailRepo.save(orderDetails);
  }

  async cancelOrder(id: number, body: UpdateOrderDto, user): Promise<Order> {
    const { reason } = body;
    const order = await this.findOrderByPk(id);
    if (!order) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['ORDER_NOT_FOUND'].code,
        code['ORDER_NOT_FOUND'].type,
      );
    }

    order.status = -1;
    order.extra = {
      cancelOrder: {
        reason,
        userInfo: {
          id: user.id,
          fullName: user.fullName,
        },
      },
    };

    return await this.orderRepo.save(order);
  }

  async findOrderByPk(id: number): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['ORDER_NOT_FOUND'].code,
        code['ORDER_NOT_FOUND'].type,
      );
    }
    return order;
  }
}
