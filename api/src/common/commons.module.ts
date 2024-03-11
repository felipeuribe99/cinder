import { Module } from "@nestjs/common";
import { CommonsController } from "./commons.controller";
import { CommonsService } from "./commons.service";
import { RoomsModule } from "../rooms/rooms.module";
import { OrganizationsModule } from "../organizations/organizations.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    OrganizationsModule,
    RoomsModule,
    UsersModule
  ],
  controllers: [CommonsController],
  providers: [CommonsService],
})
export class CommonsModule {}