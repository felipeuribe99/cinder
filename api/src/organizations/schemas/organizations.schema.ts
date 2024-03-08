import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  _id: Types.ObjectId;
  __v: number;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
