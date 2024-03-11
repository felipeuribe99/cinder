import { Module } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { userStub } from "../../users/test/stubs/user.stub";

@Module({
  providers: [
    {
      provide: AuthService,
      useValue: {
        authenticate: jest.fn().mockImplementation((email: string, password: string) => ({
          id: userStub()._id,
        })
      )}
    }
  ],
  exports: [AuthService],
})
export class FakeAuthModule {}
