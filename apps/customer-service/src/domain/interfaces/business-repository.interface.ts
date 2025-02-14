import { ListBusinessDto } from '../../application/dto/business/list-business.dto';
import { Business } from '../entities/business.entity';

export abstract class IBusinessRepository {
  abstract create(business: Partial<Business>): Business;
  abstract save(business: Business): Promise<Business>;
  abstract getManyAndCount(
    listBusinessDto: ListBusinessDto,
  ): Promise<[Business[], number]>;
  abstract findById(id: number): Promise<Business>;
  abstract findOne(options: FindOneOptions<Business>): Promise<Business>;
}
