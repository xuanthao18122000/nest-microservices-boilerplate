import { Injectable } from '@nestjs/common';
import { IBusinessRepository } from 'apps/customer-service/src/domain/interfaces/business-repository.interface';
import { Business } from 'apps/customer-service/src/domain/entities/business.entity';
import { ListBusinessDto } from '../../dto/business/list-business.dto';

@Injectable()
export class GetAllBusinessUseCase {
  constructor(private readonly BusinessRepository: IBusinessRepository) {}

  async execute(
    listBusinessDto: ListBusinessDto,
  ): Promise<[Business[], number]> {
    return this.BusinessRepository.getManyAndCount(listBusinessDto);
  }
}
