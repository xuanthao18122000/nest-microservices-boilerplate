import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStoreDto } from '../../dto/store/update-store.dto';
import { IStoreRepository } from 'apps/inventory-service/src/domain/interfaces/store-repository.interface';
import { Store } from 'apps/inventory-service/src/domain/entities/store.entity';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new NotFoundException('Không tìm thấy cửa hàng!');
    }

    Object.assign(store, updateStoreDto);

    return this.storeRepository.save(store);
  }
}
