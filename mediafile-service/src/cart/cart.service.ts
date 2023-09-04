import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Cart } from 'src/database/schema';
import { Repository } from 'typeorm';
import {
  CreateCartDto,
  ListCartDto,
  Product,
  UpdateCartDto,
} from './dto/cart.dto';
import { CartItem } from 'src/database/schema/cart-item.schema';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,

    @Inject('PRODUCT_SERVICE')
    private readonly productsService: ClientProxy,
  ) {}

  async getCarts(query: ListCartDto) {
    const { page, perPage } = query;
    const [list, total] = await this.cartRepo
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItems')
      .getManyAndCount();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async create(
    userId: number,
    { productId }: CreateCartDto,
  ): Promise<CartItem | any> {
    const product: any = this.productsService.send(
      {
        cmd: 'get-one-product',
      },
      productId,
    );

    if (!product) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['PRODUCT_NOT_FOUND'].code,
        code['PRODUCT_NOT_FOUND'].type,
      );
    }

    const cart = await this.cartRepo.findOneBy({ userId });

    // Cart Does Not Exist
    if (!cart) {
      const newCart = await this.cartRepo.save({
        userId,
        total: 0,
      });

      return await this.cartItemRepo.save({
        productId: product.id,
        quantity: 1,
        price: product.price,
        cart: { id: newCart.id },
      });
    }

    // Existed Cart
    const cartItem = await this.cartItemRepo.findOne({
      where: {
        cart: { id: cart.id },
        productId,
      },
    });
    if (!cartItem) {
      return await this.cartItemRepo.save({
        productId: product.id,
        quantity: 1,
        price: product.price,
        cart: { id: cart.id },
      });
    }
    cartItem.quantity += 1;
    cartItem.price = product.price * cartItem.quantity;
    return await this.cartItemRepo.save(cartItem);
  }

  async update(id: number, { quantity }: UpdateCartDto): Promise<Cart> {
    const cartItem = await this.cartItemRepo.findOneBy({ id });

    if (!cartItem) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['CART_ITEM_NOT_FOUND'].code,
        code['CART_ITEM_NOT_FOUND'].type,
      );
    }

    cartItem.quantity = quantity;
    cartItem.price = cartItem.price * cartItem.quantity;
    return await this.cartRepo.save(cartItem);
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
