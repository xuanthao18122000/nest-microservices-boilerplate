import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

abstract class BaseEntity {
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}

abstract class IntIdEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}

abstract class UUIDIdentifiableEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}

abstract class BigintIdEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
}

export { BaseEntity, BigintIdEntity, IntIdEntity, UUIDIdentifiableEntity };
