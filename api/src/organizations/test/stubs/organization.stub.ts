import { Types } from "mongoose";
import { Organization } from "../../schemas/organizations.schema";

export const organizationStub = (): Organization => {
  return {
    name: "Test Organization",
    _id: "65ea398ffd894565b7738171" as unknown as Types.ObjectId,
    __v: 0
  }
}
