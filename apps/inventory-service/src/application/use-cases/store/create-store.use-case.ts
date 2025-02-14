import { Injectable } from '@nestjs/common';
import { IStoreRepository } from 'apps/inventory-service/src/domain/interfaces/store-repository.interface';
import { CreateStoreDto } from '../../dto/store/create-store.dto';
import { Store } from 'apps/inventory-service/src/domain/entities/store.entity';

@Injectable()
export class CreateStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute({
    name,
    type,
    address,
    latitude,
    longitude,
    phoneNumber,
    shipCode,
    shortName,
    siteCode,
  }: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create({
      name,
      type,
      address,
      latitude,
      longitude,
      phoneNumber,
      shipCode,
      shortName,
      siteCode,
    });

    return this.storeRepository.save(store);
  }
}
