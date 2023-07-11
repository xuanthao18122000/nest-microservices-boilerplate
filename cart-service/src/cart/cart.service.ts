import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Cart } from 'src/database/schema';
import { Repository } from 'typeorm';
import { CreateCartDto, ListCartDto, UpdateCartDto } from './dto/cart.dto';
import { CartItem } from 'src/database/schema/cart-item.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
  ) {}

  async getAll(query: ListCartDto) {
    const { page, perPage } = query;
    const [list, total] = await this.cartRepo
      .createQueryBuilder('product')
      .getManyAndCount();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async create(body: CreateCartDto): Promise<Cart> {
    const { name, code, price, categoryId } = body;

    return await this.cartRepo.create();
  }

  async update(id: number, body: UpdateCartDto): Promise<Cart> {
    const { name, price, status, code, categoryId } = body;

    return await this.cartRepo.create();
  }

  async findProductByPk(id: number): Promise<Cart> {
    const product = await this.cartRepo.findOneBy({ id });

    if (!product) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['PRODUCT_NOT_FOUND'].code,
        code['PRODUCT_NOT_FOUND'].type,
      );
    }
    return product;
  }

  async findCartItem(): Promise<CartItem[]> {
    return await this.cartItemRepo.find();
  }
}
