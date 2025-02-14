import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/store/create-store.dto';
import { UpdateStoreDto } from '../dto/store/update-store.dto';
import { ListStoreDto } from '../dto/store/list-store.dto';
import { GetAllStoreUseCase } from '../use-cases/store/get-all-store.use-case';
import { GetOneStoreUseCase } from '../use-cases/store/get-one-store.use-case';
import { CreateStoreUseCase } from '../use-cases/store/create-store.use-case';
import { UpdateStoreUseCase } from '../use-cases/store/update-store.use-case';

@Injectable()
export class StoreService {
  constructor(
    private readonly getAllStoreUseCase: GetAllStoreUseCase,
    private readonly getOneStoreUseCase: GetOneStoreUseCase,
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
  ) {}

  async createStore(createStoreDto: CreateStoreDto) {
    return this.createStoreUseCase.execute(createStoreDto);
  }

  async updateStore(id: number, updateStoreDto: UpdateStoreDto) {
    return this.updateStoreUseCase.execute(id, updateStoreDto);
  }

  async getStoreById(id: number) {
    return this.getOneStoreUseCase.execute({ id });
  }

  async getAllStores(listStoreDto: ListStoreDto) {
    return this.getAllStoreUseCase.execute(listStoreDto);
  }

  async getStatistics() {}
}
