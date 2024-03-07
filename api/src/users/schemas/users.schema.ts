import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  // organization: Organization;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] })
  // room: Room[];

}

export const UserSchema = SchemaFactory.createForClass(User);
