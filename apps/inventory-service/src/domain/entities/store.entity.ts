import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ProductStock } from './product-stock.entity';
import { IntIdEntity } from '@app/common/utils/entity-base.util';
import { StoreStatusEnum, StoreTypeEnum } from '../enums';

@Entity({ name: 'stores' })
export class Store extends IntIdEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shortName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: StoreStatusEnum,
    default: StoreStatusEnum.ACTIVE,
  })
  status: StoreStatusEnum;

  @Column({ type: 'int', default: StoreTypeEnum.STORE })
  type: StoreTypeEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  siteCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shipCode: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @OneToMany(() => ProductStock, (productStock) => productStock.store)
  productStocks: ProductStock[];
}
