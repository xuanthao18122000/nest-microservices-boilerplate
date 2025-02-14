import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Provider, ProviderDocument } from './entities/provider.entity';
import { Model, Types } from 'mongoose';
import { ListProviderDto } from './dto/list-provider.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
  ) {}

  async create({
    name,
    email,
    phoneNumber,
    taxNo,
    type,
    address,
  }: CreateProviderDto): Promise<Provider> {
    const newProvider = new this.providerModel({
      name,
      email,
      phoneNumber,
      taxNo,
      type,
      address,
    });

    return newProvider.save();
  }

  async getAll(query: ListProviderDto) {
    const { page = 1, perPage = 10, type, status } = query;

    const filter = {
      ...(type && { type }),
      ...(status && { status }),
    };

    const skip = (page - 1) * perPage;

    const [providers, total] = await Promise.all([
      this.providerModel
        .find(filter)
        .skip(skip)
        .limit(perPage)
        .exec(),
      this.providerModel.countDocuments(filter),
    ]);

    return {
      data: providers,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };
  }

  async getOne(id: string): Promise<Provider> {
    const provider = await this.providerModel
      .findById(id)
      .populate('category')
      .exec();

    if (!provider) {
      throw new NotFoundException(`Không tìm thấy nhà cung cấp!`);
    }

    return provider;
  }

  async update(id: string, updateData: UpdateProviderDto): Promise<Provider> {
    const updatedProvider = await this.providerModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();

    if (!updatedProvider) {
      throw new NotFoundException(`Không tìm thấy nhà cung cấp!`);
    }

    return updatedProvider;
  }

  async delete(id: string) {
    const deletedProduct = await this.providerModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Không tìm thấy nhà cung cấp!`);
    }

    return true;
  }
}
