import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../../domain/entities/business.entity';
import { IBusinessRepository } from '../../domain/interfaces/business-repository.interface';
import { ListBusinessDto } from '../../application/dto/business/list-business.dto';

@Injectable()
export class BusinessRepository implements IBusinessRepository {
  @InjectRepository(Business)
  private readonly businessRepo: Repository<Business>;

  create(business: Partial<Business>) {
    return this.businessRepo.create(business);
  }

  save(business: Business): Promise<Business> {
    return this.businessRepo.save(business);
  }

  getManyAndCount(query: ListBusinessDto): Promise<[Business[], number]> {
    const filterBuilder = this.businessRepo
      .fCreateFilterBuilder('business', query)
      .fAndWhereLikeString('name')
      .fAndWhere('status')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findById(id: number): Promise<Business> {
    return this.businessRepo.findOneBy({ id });
  }

  findOne(options: FindOneOptions<Business>): Promise<Business> {
    return this.businessRepo.findOneBy(criteria);
  }
}
