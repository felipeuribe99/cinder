import { Types } from "mongoose";
import { User } from "../../schemas/users.schema";
import { organizationStub } from "../../../organizations/test/stubs/organization.stub";

export const userStub = (): User => {
  return {
    name: "Test User",
    email: "test@test.com",
    password: "password",
    admin: false,
    organization: organizationStub(),
    _id: "65ea398ffd894565b7738174" as unknown as Types.ObjectId,
    __v: 0
  }
}
