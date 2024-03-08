import { Types } from "mongoose";
import { Room } from "../../schemas/rooms.schema";
import { organizationStub } from "../../../organizations/test/stubs/organization.stub";

export const roomStub = (): Room => {
  return {
    name: "Test Room",
    organization: organizationStub(),
    _id: "65ea398ffd894565b7738174" as unknown as Types.ObjectId,
    __v: 0
  }
}
