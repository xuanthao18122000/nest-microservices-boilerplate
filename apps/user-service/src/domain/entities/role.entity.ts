import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { IntIdEntity } from '@app/common/utils/entity-base.util';
import { RoleStatusEnum } from '../enums';

@Entity('roles')
export class Role extends IntIdEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  key: string;

  @Column({ type: 'int', default: RoleStatusEnum.ACTIVE })
  status: number;

  @OneToMany(() => User, (user) => user.role, {
    createForeignKeyConstraints: false,
  })
  users: User[];

  constructor(data: Partial<Role>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
