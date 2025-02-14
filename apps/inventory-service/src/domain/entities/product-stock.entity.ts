import { Entity, Column, ManyToOne } from 'typeorm';
import { IntIdEntity } from '@app/common/utils/entity-base.util';
import { Store } from './store.entity';

@Entity({ name: 'product_stocks' })
export class ProductStock extends IntIdEntity {
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'int' })
  storeId: number;

  @Column({ type: 'int' })
  providerId: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  inStockQuantity: number;

  @Column({ type: 'int', default: 0 })
  deliveryQuantity: number;

  @Column({ type: 'int', default: 0 })
  transferQuantity: number;

  @Column({ type: 'int', default: 0 })
  holdingQuantity: number;

  @Column({ type: 'int', default: 0 })
  warrantyQuantity: number;

  @Column({ type: 'double precision', default: 0 })
  originalPrice: number;

  @Column({ type: 'double precision', default: 0 })
  sellingPrice: number;

  @ManyToOne(() => Store, (store) => store.productStocks, { eager: true })
  store: Store;
}
