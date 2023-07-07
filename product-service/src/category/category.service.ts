import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorException } from 'src/common/response/error-payload.dto';
import code from 'src/common/response/status-code';
import { Category } from 'src/database/schema';
import { Repository } from 'typeorm';
import {
  CreateCategoryDto,
  ListCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async getAll(query: ListCategoryDto) {
    const { page, perPage } = query;
    const [list, total] = await this.categoryRepo
      .createQueryBuilder('category')
      .getManyAndCount();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async getOne(id: number): Promise<Category | any> {
    const category = await this.findCategoryByPk(id);
    return category.serialize();
  }

  async create(body: CreateCategoryDto) {
    const { name } = body;
    const isExistCategory = await this.categoryRepo.findOneBy({
      name,
    });

    if (isExistCategory) {
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code['CATEGORY_EXISTED'].code,
        code['CATEGORY_EXISTED'].type,
      );
    }

    return await this.categoryRepo.save({
      name,
      status: 1,
    });
  }

  async update(id: number, body: UpdateCategoryDto): Promise<Category> {
    const { name, status } = body;

    const category = await this.findCategoryByPk(id);

    if (name) {
      const isExistCategory = await this.categoryRepo.findOneBy({ name });
      if (isExistCategory) {
        throw new ErrorException(
          HttpStatus.CONFLICT,
          code['CATEGORY_EXISTED'].code,
          code['CATEGORY_EXISTED'].type,
        );
      }
      category.name = name;
    }
    if(status) category.status = status;

    return await this.categoryRepo.save(category);
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
