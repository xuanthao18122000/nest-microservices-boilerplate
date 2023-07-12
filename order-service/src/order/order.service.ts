import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Order } from 'src/database/schema';
import { Repository } from 'typeorm';
import { CreateOrderDto, ListOrderDto, UpdateOrderDto } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @Inject('USER_SERVICE')
    private readonly usersService: ClientProxy,

    @Inject('PRODUCT_SERVICE')
    private readonly productsService: ClientProxy,
  ) {}

  getAllUsers(query: ListOrderDto) {
    return this.usersService.send({
      cmd: 'get-all-user'
    }, query)
  }

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

  async generateCode() {
    const latestOrder = await this.orderRepo.findOne({
      order: {
        code: 'DESC',
      },
    });

    const latestCode = latestOrder.code;
    let code: string;
    if (latestCode) {
      const codeNumber = parseInt(latestCode.substr(1)); // Lấy phần số từ mã hiện tại
      const nextCodeNumber = codeNumber + 1;
      const nextCode = `#${nextCodeNumber.toString().padStart(4, '0')}`; // Định dạng lại mã tiếp theo
      code = nextCode;
    } else {
      code = '#0001'; // Giá trị mặc định cho trường code nếu không có bất kỳ đơn hàng nào trong cơ sở dữ liệu
    }
    return code;
  }

  async create(body: CreateOrderDto) {
    const { } = body;

    const code = await this.generateCode();
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
