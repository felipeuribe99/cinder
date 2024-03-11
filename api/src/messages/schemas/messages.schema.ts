import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "../../users/schemas/users.schema";
import { Room } from "../../rooms/schemas/rooms.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room: Room;

  @Prop({ default: Date.now })
  date: Date;

  _id: Types.ObjectId;
  __v: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
