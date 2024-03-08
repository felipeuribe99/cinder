import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Organization } from "../../organizations/schemas/organizations.schema";

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  organization: Organization;

  _id: Types.ObjectId;
  __v: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
