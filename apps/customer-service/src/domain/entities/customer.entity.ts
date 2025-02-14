import { Column, Entity } from 'typeorm';
import { CustomerTypeEnum, GenderEnum } from '../enums';
import { IntIdEntity } from '@app/common/utils/entity-base.util';

@Entity({ name: 'customers' })
export class Customer extends IntIdEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.OTHER })
  gender: GenderEnum;

  @Column({
    type: 'enum',
    enum: CustomerTypeEnum,
    default: CustomerTypeEnum.RETAIL,
  })
  type: CustomerTypeEnum;
}
