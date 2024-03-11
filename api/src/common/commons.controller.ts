import { Controller, Post, UseGuards } from "@nestjs/common";
import { CommonsService } from "./commons.service";
import { CreateOrganizationDto } from "../organizations/dto/organizations.dto";
import { AuthGuard } from "../auth/auth.guard";
import { CreateRoomDto } from "../rooms/dto/rooms.dto";

@Controller("commons")
export class CommonsController {
  constructor(private readonly commonsService: CommonsService) {}

  @UseGuards(AuthGuard)
  @Post('create-organization')
  async createOrganization(createOrganizationDto: CreateOrganizationDto, req: any) {
    const { userId } = req.user._id;
    return this.commonsService.createOrganization(userId, createOrganizationDto);
  }

  @UseGuards(AuthGuard)
  @Post('create-room')
  async createRoom(createRoomDto: CreateRoomDto, req: any) {
    const { userId } = req.user._id;
    return this.commonsService.createRoom(userId, createRoomDto);
  }
}
