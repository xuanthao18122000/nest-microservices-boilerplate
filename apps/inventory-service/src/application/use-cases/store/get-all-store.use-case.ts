import { Injectable } from '@nestjs/common';
import { Store } from 'apps/inventory-service/src/domain/entities/store.entity';
import { ListStoreDto } from '../../dto/store/list-store.dto';
import { IStoreRepository } from 'apps/inventory-service/src/domain/interfaces/store-repository.interface';

@Injectable()
export class GetAllStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(listStoreDto: ListStoreDto): Promise<[Store[], number]> {
    return this.storeRepository.getManyAndCount(listStoreDto);
  }
}
