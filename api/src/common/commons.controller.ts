import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { CommonsService } from "./commons.service";
import { CreateOrganizationDto } from "../organizations/dto/organizations.dto";
import { AuthGuard } from "../auth/auth.guard";
import { CreateRoomDto } from "../rooms/dto/rooms.dto";

@Controller("commons")
export class CommonsController {
  constructor(private readonly commonsService: CommonsService) {}

  @UseGuards(AuthGuard)
  @Post('create-organization')
  async createOrganization(
    @Body()createOrganizationDto: CreateOrganizationDto, 
    @Request() req: any
  ) {
    const userId = req.user.sub;
    return this.commonsService.createOrganization(userId, createOrganizationDto);
  }

  @UseGuards(AuthGuard)
  @Post('create-room')
  async createRoom(
    @Body() createRoomDto: CreateRoomDto, 
    @Request() req: any
  ) {
    const userId = req.user.sub;
    return this.commonsService.createRoom(userId, createRoomDto);
  }
}
