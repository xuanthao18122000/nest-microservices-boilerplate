import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column({ unique: true})
  name: string;

  @Column({ type: 'jsonb', default: { list: [] }, nullable: true })
  logs: object;

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
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
