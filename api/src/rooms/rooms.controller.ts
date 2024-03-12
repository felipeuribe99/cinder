import { Controller, Get, Put, Param, Body, UseGuards } from "@nestjs/common";
import { UpdateRoomDto } from "./dto/rooms.dto";
import { RoomsService } from "./rooms.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard)
  @Get("/organization/:organizationId")
  async findAll(
    @Param("organizationId") organizationId: string
  ) {
    return this.roomsService.findAll(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  async update(
    @Param("id") id: string, 
    @Body() updateRoomDto: UpdateRoomDto
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }
}
