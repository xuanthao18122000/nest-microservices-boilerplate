import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column()
  email: string;

  @Column({ type: 'varchar', default: '123456a@' })
  password: string;

  @Column({ type: 'int', default: -1 })
  userId: number;

  @Column({ default: new Date()})
  orderDate: Date;

  @Column({ nullable: true})
  orderPhone: string;

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
