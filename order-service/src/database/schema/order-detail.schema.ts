import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'order_details' })
export class OrderDetail extends BaseEntity {
  @Column()
  unitPrice: string;

  @Column({ type: 'float'})
  detailPrice: number;

  @Column({ type: 'int', default: -1 })
  quantity: number;

  @Column({ type: 'int', default: -1 })
  discount: number;

  @Column({ type: 'int', default: -1 })
  status: number;

  @Column({ type: 'int', default: -1 })
  productId: number;

  @Column({ type: 'int', default: -1 })
  orderId: number;

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
