import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBusinessDto } from '../../dto/business/update-business.dto';
import { IBusinessRepository } from 'apps/customer-service/src/domain/interfaces/business-repository.interface';
import { Business } from 'apps/customer-service/src/domain/entities/business.entity';

@Injectable()
export class UpdateBusinessUseCase {
  constructor(private readonly businessRepository: IBusinessRepository) {}

  async execute(
    id: number,
    updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business> {
    const business = await this.businessRepository.findById(id);

    if (!business) {
      throw new NotFoundException('Không tìm thấy khách hàng doanh nghiệp!');
    }

    Object.assign(business, updateBusinessDto);

    return this.businessRepository.save(business);
  }
}
