import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { StockSlipDetail } from './stock-slip-detail.entity';
import { IntIdEntity } from '@app/common/utils/entity-base.util';

@Entity({ name: 'stock_slips' })
export class StockSlip extends IntIdEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  code: string;

  @Column({ type: 'int', nullable: true })
  sourceWarehouseId: number;

  @Column({ type: 'int', nullable: true })
  destinationWarehouseId: number;

  @Column({ type: 'uuid', nullable: true })
  providerId: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', nullable: true })
  cashAmount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cashAccountCode: string;

  @Column({ type: 'decimal', nullable: true })
  transferAmount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transferAccountCode: string;

  @Column({ type: 'date', nullable: true })
  payDate: Date;

  @Column({ type: 'int', nullable: true })
  status: number;

  @Column({ type: 'double precision', nullable: true })
  totalAmount: number;

  @Column({ type: 'double precision', nullable: true })
  discountAmount: number;

  @Column({ type: 'int', nullable: true })
  type: number;

  @Column({ type: 'date', nullable: true })
  importDate: Date;

  @Column({ type: 'date', nullable: true })
  exportDate: Date;

  @Column({ type: 'date', nullable: true })
  transferDate: Date;

  @Column({ type: 'uuid', nullable: true })
  relateStockSlipId: string;

  @Column({ type: 'int', nullable: true })
  approveBy: number;

  @Column({ type: 'int', nullable: true })
  confirmBy: number;

  @Column({ type: 'date', nullable: true })
  approveDate: Date;

  @Column({ type: 'date', nullable: true })
  confirmDate: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'int', nullable: true })
  creatorId: number;

  @Column({ type: 'int', nullable: true })
  companyId: number;

  @Column({ type: 'uuid', nullable: true })
  billId: string;

  @Column({ type: 'date', nullable: true })
  vatDate: Date;

  @Column({ type: 'double precision', nullable: true })
  vatAmount: number;

  @Column({ type: 'int', nullable: true })
  vatType: number;

  @Column({ type: 'int', nullable: true })
  discountType: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  vatCode: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  vatSerial: string;

  @Column({ type: 'int', nullable: true })
  purchaseOrderId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  purchaseOrderCode: string;

  @Column({ type: 'text', nullable: true })
  deleteReason: string;

  @Column({ type: 'int', default: 1 })
  merchantId: number;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;

  @Column({ type: 'int', nullable: true })
  customerId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customerName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  customerMobile: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  customerAddress: string;

  @Column({ type: 'int', default: 1 })
  remindStatus: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parentId: string;

  @Column({ type: 'int', default: 0 })
  relationType: number;

  @Column({ type: 'json', nullable: true })
  stockSlipOriginal: any;

  @OneToMany(
    () => StockSlipDetail,
    (stockSlipDetail) => stockSlipDetail.stockSlip,
  )
  stockSlipDetails: StockSlipDetail[];

  @OneToMany(() => StockSlip, (stockSlip) => stockSlip.parent)
  stockSlipChild: StockSlip[];

  @ManyToOne(() => StockSlip, (stockSlip) => stockSlip.stockSlipChild)
  parent: StockSlip;
}
