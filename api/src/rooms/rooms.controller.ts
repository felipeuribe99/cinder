import { Controller, Get, Post, Put, Param } from "@nestjs/common";
import { CreateRoomDto, UpdateRoomDto } from "./dto/rooms.dto";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Post()
  async create(createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }
}
