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
import { Category } from './category.schema';
import { Product } from './product.schema';

@Entity({ name: 'discount' })
export class Discount extends BaseEntity {
  @Column({nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'discount_percent', type: 'numeric', nullable: true })
  discountPercent: number;
  
  @Column({ type: 'int', default: -1 })
  status: number;

  @OneToMany(() => Product, (product) => product.discount)
  products: Product;

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
      name: this.name,
      description: this.description,
      status: this.status,
    };
  }
}
