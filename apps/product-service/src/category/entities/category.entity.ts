import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CategoryStatusEnum } from '../../enums';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({
    type: String,
    enum: CategoryStatusEnum,
    default: CategoryStatusEnum.ACTIVE,
  })
  status: CategoryStatusEnum;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parent?: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
