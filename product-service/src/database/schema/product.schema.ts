import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';
import { Category } from './category.schema';

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

  @Column({ type: 'jsonb', default: { list: [] }, nullable: true })
  logs: object;

  @Column({ type: 'int', default: -1 })
  status: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  // constructor(data: any = null) {
  //   if (data) {
  //     super()
  //     this.id = data.id || null;
  //     this.name = data.name;
  //     this.code = data.code;
  //     this.description = data.description;
  //     this.price = data.price;
  //     this.logs = data.logs;
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
