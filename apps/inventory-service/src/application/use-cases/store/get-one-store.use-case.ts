import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from 'apps/inventory-service/src/domain/entities/store.entity';
import { IStoreRepository } from 'apps/inventory-service/src/domain/interfaces/store-repository.interface';

@Injectable()
export class GetOneStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(options: FindOneOptions<Store>): Promise<Store> {
    const store = await this.storeRepository.findOne(criteria);

    if (!store) {
      throw new NotFoundException('Không tìm thấy cửa hàng!');
    }

    return store;
  }
}
