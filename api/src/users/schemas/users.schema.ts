import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Organization } from "../../organizations/schemas/organizations.schema";
import { Room } from "../../rooms/schemas/rooms.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  admin: boolean;

  @Prop({ required: true, default: false })
  isApproved: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  organization: Organization;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] })
  rooms: Room[];

  _id: Types.ObjectId;
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
