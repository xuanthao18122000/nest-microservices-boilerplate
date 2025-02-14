import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from './entities/brand.entity';
import { Model, Types } from 'mongoose';
import { ListBrandDto } from './dto/list-brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {}

  async create({
    name,
  }: CreateBrandDto): Promise<Brand> {
    const newBrand = new this.brandModel({
      name,
    });

    return newBrand.save();
  }

  async getAll(query: ListBrandDto) {
    const { page = 1, perPage = 10, name, status } = query;

    const filter = {
      ...(name && { name }),
      ...(status && { status }),
    };

    const skip = (page - 1) * perPage;

    const [brands, total] = await Promise.all([
      this.brandModel
        .find(filter)
        .skip(skip)
        .limit(perPage)
        .exec(),
      this.brandModel.countDocuments(filter),
    ]);

    return {
      data: brands,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };
  }

  async getOne(id: string): Promise<Brand> {
    const brand = await this.brandModel
      .findById(id)
      .populate('category')
      .exec();

    if (!brand) {
      throw new NotFoundException(`Không tìm thấy thương hiệu!`);
    }

    return brand;
  }

  async update(id: string, updateData: UpdateBrandDto): Promise<Brand> {
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();

    if (!updatedBrand) {
      throw new NotFoundException(`Không tìm thấy thương hiệu!`);
    }

    return updatedBrand;
  }

  async delete(id: string) {
    const deletedProduct = await this.brandModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Không tìm thấy thương hiệu!`);
    }

    return true;
  }
}
