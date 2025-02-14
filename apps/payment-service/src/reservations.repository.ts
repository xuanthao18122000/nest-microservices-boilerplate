import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { PaymentDocument } from './models/payment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<PaymentDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(PaymentDocument.name)
    reservationModel: Model<PaymentDocument>,
  ) {
    super(reservationModel);
  }
}
