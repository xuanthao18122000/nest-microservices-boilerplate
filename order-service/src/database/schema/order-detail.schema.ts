import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';
import { Order } from './order.schema';

@Entity({ name: 'order_details' })
export class OrderDetail extends BaseEntity {
  @Column({ name: 'unit_price', nullable: true })
  unitPrice: string;

  @Column({ name: 'detail_price', type: 'float', nullable: true })
  detailPrice: number;

  @Column({ type: 'int', default: -1, nullable: true  })
  quantity: number;

  @Column({ type: 'int', default: -1, nullable: true })
  discount: number;

  @Column({ type: 'int', default: -1, nullable: true })
  status: number;

  @Column({ type: 'int', default: -1, nullable: true })
  productId: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order; 

  serialize() {
    return {
      id: this.id,
      status: this.status,
    };
  }
}
