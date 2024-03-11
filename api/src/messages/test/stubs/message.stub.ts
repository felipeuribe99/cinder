import { Types } from "mongoose";
import { Message } from "../../schemas/messages.schema";
import { roomStub } from "../../../rooms/test/stubs/room.stub";
import { userStub } from "../../../users/test/stubs/user.stub";

export const messageStub = (): Message => {
  return {
    text: "Test Message",
    user: userStub(),
    room: roomStub(),
    date: new Date(),
    _id: "65ea398ffd894565b7738174" as unknown as Types.ObjectId,
    __v: 0
  }
}
