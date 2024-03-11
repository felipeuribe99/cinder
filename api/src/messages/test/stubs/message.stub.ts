import { Types } from "mongoose";
import { Message } from "../../schemas/messages.schema";
import { roomStub } from "../../../rooms/test/stubs/room.stub";
import { userStub } from "../../../users/test/stubs/user.stub";

export const messageStub = (): Message => {
  return {
    text: "Test Message",
    user: userStub(),
    room: roomStub(),
    date: "2024-03-11T13:47:48.823Z" as unknown as Date,
    _id: "65ea398ffd894565b7738170" as unknown as Types.ObjectId,
    __v: 0
  }
}
