import { ListStoreDto } from '../../application/dto/store/list-store.dto';
import { Store } from '../entities/store.entity';

export abstract class IStoreRepository {
  abstract create(store: Partial<Store>): Store;
  abstract save(store: Store): Promise<Store>;
  abstract getManyAndCount(
    listStoreDto: ListStoreDto,
  ): Promise<[Store[], number]>;
  abstract findById(id: number): Promise<Store>;
  abstract findOne(options: FindOneOptions<Store>): Promise<Store>;
}
