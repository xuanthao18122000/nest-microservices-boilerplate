import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';
import { CartItem } from './cart-item.schema';

@Entity({ name: 'carts' })
export class Cart extends BaseEntity {
  @Column({name: 'user_id', unique: true, nullable: true })
  userId: string;

  @Column({ type: 'numeric', nullable: true })
  total: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  // constructor(data: any = null) {
  //   if (data) {
  //     super()
  //     this.id = data.id || null;
  //     this.userId = data.userId;
  //   }
  // }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
    };
  }
}
