import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Category, Product } from 'src/database/schema';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  ListProductDto,
  UpdateProductDto,
} from './dto/product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
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
    const { name, code, price, categoryId } = body;
    const [ isExistCode, category] = await Promise.all([
      this.productRepo.findOneBy({
        code,
      }),
      this.findCategoryByPk(categoryId)
    ])

    if (isExistCode) {
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code['PRODUCT_EXISTED'].code,
        code['PRODUCT_EXISTED'].type,
      );
    }

    return await this.productRepo.save({
      name,
      code,
      price,
      status: 1,
      category: { id: category.id}
    });
  }

  async update(id: number, body: UpdateProductDto): Promise<Product> {
    const { name, price, status, code, categoryId } = body;

    const product = await this.findProductByPk(id);

    if (code) {
      const isExistedCode = await this.productRepo.findOneBy({ code });

      if (isExistedCode) {
        throw new ErrorException(
          HttpStatus.NOT_FOUND,
          code['PRODUCT_CODE_EXISTED'].code,
          code['PRODUCT_CODE_EXISTED'].type,
        );
      }
      product.code = code;
    }
    if(categoryId){
      const existedCategory = await this.findCategoryByPk(categoryId)
      product.category.id = categoryId;
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (status) product.status = status;

    return await this.productRepo.save(product);
  }

  async findProductByPk(id: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['PRODUCT_NOT_FOUND'].code,
        code['PRODUCT_NOT_FOUND'].type,
      );
    }
    return product;
  }

  async findCategoryByPk(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code['CATEGORY_NOT_FOUND'].code,
        code['CATEGORY_NOT_FOUND'].type,
      );
    }
    return category;
  }
}
