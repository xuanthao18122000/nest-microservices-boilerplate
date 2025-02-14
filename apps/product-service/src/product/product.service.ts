import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { ListProductDto } from './dto/list-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create({
    name,
    code,
    price,
    categoryId,
  }: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel({ name, code, price, categoryId });
    return newProduct.save();
  }

  async getAll(query: ListProductDto) {
    const { page = 1, perPage = 10, categoryId, status } = query;
  
    const filter = {
      ...(categoryId && { category: new Types.ObjectId(categoryId) }),
      ...(status && { status }),
    };
  
    const skip = (page - 1) * perPage;
  
    const [products, total] = await Promise.all([
      this.productModel
        .find(filter)
        .populate('category')
        .skip(skip)
        .limit(perPage)
        .exec(),
      this.productModel.countDocuments(filter),
    ]);
  
    return {
      data: products,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };
  }
  
  async getOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('category')
      .exec();

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm!`);
    }

    return product;
  }

  async update(id: string, updateData: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Không tìm thấy sản phẩm!`);
    }

    return updatedProduct;
  }

  async delete(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Không tìm thấy sản phẩm!`);
    }

    return true;
  }
}
