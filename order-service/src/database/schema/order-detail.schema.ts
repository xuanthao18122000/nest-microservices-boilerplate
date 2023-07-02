import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'orders' })
export class OrderDetail extends BaseEntity {
  @Column()
  unitPrice: string;

  @Column({ type: 'int', default: -1 })
  quantity: number;

  @Column({ type: 'int', default: -1 })
  discount: number;

  @Column({ type: 'int', default: -1 })
  status: number;

  @Column({ type: 'int', default: -1 })
  product_id: number;

  @Column({ type: 'int', default: -1 })
  order_id: number;

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
