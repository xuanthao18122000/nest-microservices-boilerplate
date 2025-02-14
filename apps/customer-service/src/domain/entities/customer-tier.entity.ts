import { Column, Entity } from 'typeorm';
import { CustomerTierStatusEnum, GenderEnum } from '../enums';
import { IntIdEntity } from '@app/common/utils/entity-base.util';

@Entity({ name: 'customer_tiers' })
export class CustomerTier extends IntIdEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'double', name: 'spending_threshold' })
  spendingThreshold: number;

  @Column({
    type: 'enum',
    enum: CustomerTierStatusEnum,
    default: CustomerTierStatusEnum.ACTIVE,
  })
  status: CustomerTierStatusEnum;

  @Column({ name: 'creator_id', type: 'int', nullable: true })
  creatorId: number;
}
