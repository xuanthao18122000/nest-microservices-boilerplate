import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column({ type: 'varchar', default: '123456a@' })
  password: string;

  @Column({ type: 'text', name: 'full_name' })
  fullName?: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'jsonb', default: { list: [] }, nullable: true })
  logs: object;

  @Column({ type: 'int', nullable: true })
  gender?: number;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'int', default: -1 })
  status: number;

  public updatedAt: Date;

  constructor(data: any = null) {
    if (data) {
      super()
      this.id = data.id || null;
      this.email = data.email;
      this.address = data.address;
      this.fullName = data.fullName;
      this.phoneNumber = data.phoneNumber;
      this.gender = data.gender;
      this.status = data.status;
    }
  }

  serialize() {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
      status: this.status,
    };
  }
}
