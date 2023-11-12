import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';
import { OrderDetail } from './order-detail.schema';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ unique: true, nullable: true})
  code: string;

  @Column({ type: 'int', nullable: true })
  totalAmount: number;

  @Column({ type: 'int', default: -1 })
  userId: number;

  @Column({ default: new Date()})
  orderDate: Date;

  @Column({ nullable: true})
  orderPhone: string;

  @Column({ type: 'text', nullable: true})
  note: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'jsonb', default: { list: []} })
  extra: object;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  serialize() {
    return {
      id: this.id,
      code: this.code,
      totalAmount: this.totalAmount,
      userId: this.userId,
      orderDate: this.orderDate,
      orderPhone: this.orderPhone,
      note: this.note,
      status: this.status,
      orderDetails: this.orderDetails,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
