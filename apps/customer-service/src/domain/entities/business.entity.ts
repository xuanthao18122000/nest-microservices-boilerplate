import { Column, Entity } from 'typeorm';
import { CustomerTypeEnum, GenderEnum } from '../enums';
import { IntIdEntity } from '@app/common/utils/entity-base.util';

@Entity({ name: 'business' })
export class Business extends IntIdEntity {
  @Column({ unique: true })
  name: string;

  @Column({ name: 'tax_code' })
  taxCode: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  note: string;
}
