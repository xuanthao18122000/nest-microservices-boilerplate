import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProviderStatusEnum, ProviderTypeEnum } from '../../enums/provider.enum';

export type ProviderDocument = Provider & Document;

@Schema({ timestamps: true })
export class Provider {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  taxNo: string;

  @Prop({ type: String, enum: ProviderStatusEnum, default: ProviderStatusEnum.ACTIVE })
  status: ProviderStatusEnum;

  @Prop({ type: String, enum: ProviderTypeEnum, default: ProviderTypeEnum.INDIVIDUAL })
  type: ProviderTypeEnum;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
