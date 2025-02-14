import { Injectable, NotFoundException } from '@nestjs/common';
import { Business } from 'apps/customer-service/src/domain/entities/business.entity';
import { IBusinessRepository } from 'apps/customer-service/src/domain/interfaces/business-repository.interface';

@Injectable()
export class GetOneBusinessUseCase {
  constructor(private readonly businessRepository: IBusinessRepository) {}

  async execute(options: FindOneOptions<Business>): Promise<Business> {
    const business = await this.businessRepository.findOne(criteria);

    if (!business) {
      throw new NotFoundException('Không tìm thấy khách hàng doanh nghiệp!');
    }

    return business;
  }
}
