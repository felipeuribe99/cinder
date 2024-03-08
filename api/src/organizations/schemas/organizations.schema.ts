import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "../../users/schemas/users.schema";

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  admin: User;

  _id: Types.ObjectId;
  __v: number;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
