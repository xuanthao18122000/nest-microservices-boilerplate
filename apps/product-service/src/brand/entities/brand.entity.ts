import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BrandStatusEnum } from '../../enums';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: BrandStatusEnum,
    default: BrandStatusEnum.ACTIVE,
  })
  status: BrandStatusEnum;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
