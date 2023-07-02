import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column({nullable: true })
  name: string;

  @Column({ unique: true})
  code: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'jsonb', default: { list: [] }, nullable: true })
  logs: object;

  @Column({ type: 'int', nullable: true })
  productId: number;

  @Column({ type: 'int', default: -1 })
  status: number;

  // constructor(data: any = null) {
  //   if (data) {
  //     super()
  //     this.id = data.id || null;
  //     this.email = data.email;
  //     this.address = data.address;
  //     this.fullName = data.fullName;
  //     this.phoneNumber = data.phoneNumber;
  //     this.gender = data.gender;
  //     this.status = data.status;
  //   }
  // }

  serialize() {
    return {
      id: this.id,
      status: this.status,
    };
  }
}
