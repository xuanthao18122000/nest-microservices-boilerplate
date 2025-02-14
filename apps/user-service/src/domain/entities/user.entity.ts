import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserStatusEnum } from '../enums';
import { Role } from './role.entity';
import { IntIdEntity } from '@app/common/utils/entity-base.util';

@Entity({ name: 'users' })
export class User extends IntIdEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'int', default: UserStatusEnum.ACTIVE })
  status: number;

  @Column({ name: 'last_logout_date', type: 'timestamptz', nullable: true })
  lastLogOutDate: Date;

  @Column({ name: 'role_id', nullable: true })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'creator_id', type: 'int', nullable: true })
  creatorId: number;

  @ManyToOne(() => User, (creator) => creator.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
