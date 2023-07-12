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
import { Cart } from './cart.schema';

@Entity({ name: 'cart_items' })
export class CartItem extends BaseEntity {

  @Column({ name: 'product_id', type: 'int', nullable: true })
  productId: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;
  
  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'numeric', nullable: true })
  discount: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: "cart_id" })
  cart: Cart;
  
  // constructor(data: any = null) {
  //   if (data) {
  //     super()
  //     this.id = data.id || null;
  //     this.name = data.name;
  //     this.code = data.code;
  //     this.description = data.description;
  //     this.price = data.price;
  //     this.status = data.status;
  //   }
  // }

  serialize() {
    return {
      id: this.id,
      productId: this.productId,
    };
  }
}
