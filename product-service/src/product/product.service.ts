import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Product } from 'src/database/schema';
import { Repository } from 'typeorm';
import { CreateProductDto, ListProductDto, UpdateProductDto } from './dto/product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async getAll(query: ListProductDto) {
    const { page, perPage } = query;
    const [list, total] = await this.productRepo
      .createQueryBuilder('product')
      .getManyAndCount();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async getOne(id: number): Promise<Product | any> {
    const product = await this.findProductByPk(id);
    return product.serialize();
  }

  async create(body: CreateProductDto) {
    const { name, code } = body;
    const isExistProduct = await this.productRepo.findOneBy({
      name,
    });

    if (isExistProduct) {
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code['PRODUCT_EXISTED'].code,
        code['PRODUCT_EXISTED'].type,
      );
    }

    return await this.productRepo.save({
      name,
      code,
      status: 1,
    });
  }

  async update(id: number, body: UpdateProductDto): Promise<Product> {
    const { name, price } = body;
    
    const product = await this.findProductByPk(id);

    if(name) product.name = name;
    if(price) product.price = price;

    return await this.productRepo.save(product);
  }

  async findProductByPk(id: number): Promise<Product>{
    const product = await this.productRepo.findOneBy({ id });
    
    if (!product) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['PRODUCT_NOT_FOUND'].code,
        code['PRODUCT_NOT_FOUND'].type,
      );
    }
    return product
  }
}
