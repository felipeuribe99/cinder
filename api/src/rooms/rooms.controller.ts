import { Controller, Get, Post, Put, Param, UseGuards, Body } from "@nestjs/common";
import { CreateRoomDto, UpdateRoomDto } from "./dto/rooms.dto";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get("/:organizationId")
  async findAll(
    @Param("organizationId") organizationId: string
  ) {
    return this.roomsService.findAll(organizationId);
  }

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Put("/:id")
  async update(
    @Param("id") id: string, 
    @Body() updateRoomDto: UpdateRoomDto
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }
}
