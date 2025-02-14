import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStoreRepository } from '../../domain/interfaces/store-repository.interface';
import { Store } from '../../domain/entities/store.entity';
import { ListStoreDto } from '../../application/dto/store/list-store.dto';

@Injectable()
export class StoreRepository implements IStoreRepository {
  @InjectRepository(Store)
  private readonly storeRepo: Repository<Store>;

  create(store: Partial<Store>) {
    return this.storeRepo.create(store);
  }

  save(store: Store): Promise<Store> {
    return this.storeRepo.save(store);
  }

  getManyAndCount(query: ListStoreDto): Promise<[Store[], number]> {
    const filterBuilder = this.storeRepo
      .fCreateFilterBuilder('store', query)
      .fAndWhereLikeString('name')
      .fAndWhere('status')
      .fAndWhere('creatorId')
      .fOrderBy('id', 'DESC')
      .fAddPagination();

    return filterBuilder.getManyAndCount();
  }

  findById(id: number): Promise<Store> {
    return this.storeRepo.findOneBy({ id });
  }

  findOne(options: FindOneOptions<Store>): Promise<Store> {
    return this.storeRepo.findOneBy(criteria);
  }
}
