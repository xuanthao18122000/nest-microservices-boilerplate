import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RolesDocument = Role & Document;

@Schema({
  collection: "Role",
})
export class Role {
  _id: string;

  @Prop({
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: false,
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: false,
  })
  key: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}

const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.pre("save", async function (next) {
  next();
});
export default RoleSchema;
