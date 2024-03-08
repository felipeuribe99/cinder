import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";
import { Room, RoomSchema } from "./schemas/rooms.schema";
import { OrganizationsModule } from "src/organizations/organizations.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    OrganizationsModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}