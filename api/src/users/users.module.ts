import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User, UserSchema } from "./schemas/users.schema";
import { OrganizationsModule } from "../organizations/organizations.module";
import { RoomsModule } from "../rooms/rooms.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    OrganizationsModule,
    RoomsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}