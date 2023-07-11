import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';
import { Product } from './product.schema';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column({ unique: true})
  name: string;

  @Column({ type: 'int', default: -1 })
  status: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  // constructor(data: any = null) {
  //   if (data) {
  //     super()
  //     this.id = data.id || null;
  //     this.name = data.name;
  //     this.status = data.status;
  //   }
  // }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
