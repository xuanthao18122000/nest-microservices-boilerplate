import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create({ name, code, parentId }: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel({
      name,
      code,
      parent: parentId ? new Types.ObjectId(parentId) : null,
    });
    return newCategory.save();
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('parent').exec();
  }

  async findChildren(categoryId: string): Promise<Category[]> {
    return this.categoryModel.find({ parent: categoryId }).exec();
  }

  async getCategoryTree(): Promise<any[]> {
    const categories = await this.categoryModel.find().lean();
    return this.buildTree(categories, null);
  }

  private buildTree(categories: any[], parentId: any) {
    return categories
      .filter((category) => String(category.parent) === String(parentId))
      .map((category) => ({
        ...category,
        children: this.buildTree(categories, category._id),
      }));
  }

  async getOne(id: string) {
    const category = await this.categoryModel
      .findById(id)
      .populate('parent')
      .lean();

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục!');
    }
  
    const children = await this.findChildren(id);
    return { ...category, children };
  }

  async update(id: string, { code, name, parentId }: UpdateCategoryDto) {
    const category = await this.getOne(id);

    if(code) category.code = code;
    if(name) category.name = name;
    if(parentId) category.parent = parentId ? new Types.ObjectId(parentId) : null;

    return category.save();
  }
}
