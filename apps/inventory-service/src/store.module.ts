import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './domain/entities/store.entity';
import { StoreController } from './application/controllers/store.controller';
import { IStoreRepository } from './domain/interfaces/store-repository.interface';
import { StoreRepository } from './infrastructure/repositories/store.repository';
import { StoreService } from './application/services/store.service';
import { CreateStoreUseCase } from './application/use-cases/store/create-store.use-case';
import { UpdateStoreUseCase } from './application/use-cases/store/update-store.use-case';
import { GetOneStoreUseCase } from './application/use-cases/store/get-one-store.use-case';
import { GetAllStoreUseCase } from './application/use-cases/store/get-all-store.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreController],
  providers: [
    {
      provide: IStoreRepository,
      useClass: StoreRepository,
    },
    StoreService,
    CreateStoreUseCase,
    UpdateStoreUseCase,
    GetOneStoreUseCase,
    GetAllStoreUseCase,
  ],
})
export class StoreModule {}
