import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User, UserSchema } from "./schemas/users.schema";
import { OrganizationsModule } from "src/organizations/organizations.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    OrganizationsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}