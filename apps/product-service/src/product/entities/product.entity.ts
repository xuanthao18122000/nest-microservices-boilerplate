import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductStatusEnum } from '../../enums/product.enum';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: String, enum: ProductStatusEnum, default: ProductStatusEnum.ACTIVE })
  status: ProductStatusEnum;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
