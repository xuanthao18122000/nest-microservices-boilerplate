import { Entity, Column, ManyToOne } from 'typeorm';
import { StockSlip } from './stock-slip.entity';
import { IntIdEntity } from '@app/common/utils/entity-base.util';

@Entity({ name: 'stock_slip_details' })
export class StockSlipDetail extends IntIdEntity {
  @Column({ type: 'int' })
  stockSlipId: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'text', nullable: true })
  productImei: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  unitPrice: string;

  @Column({ type: 'double precision', nullable: true })
  originalPrice: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  quantityKind: number;

  @Column({ type: 'int', nullable: true })
  adjustAction: number;

  @Column({ type: 'double precision', nullable: true })
  totalAmount: number;

  @Column({ type: 'double precision', nullable: true })
  discountAmount: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ManyToOne(() => StockSlip, (stockSlip) => stockSlip.stockSlipDetails)
  stockSlip: StockSlip;
}
