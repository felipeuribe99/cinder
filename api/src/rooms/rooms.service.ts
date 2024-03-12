import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "./schemas/rooms.schema";
import { CreateRoomDto, UpdateRoomDto } from "./dto/rooms.dto";

import { OrganizationsService } from "../organizations/organizations.service";

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) 
    private roomModel: Model<Room>,
    private organizationsService: OrganizationsService,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { organizationId, ...roomBody } = createRoomDto;

    const organization = await this.organizationsService.findOne(organizationId);

    const room = this.roomModel.create({ ...roomBody, organization });

    return room;
  }

  async findAll(organizationId: string): Promise<Room[]> {
    await this.organizationsService.findOne(organizationId);
    return this.roomModel.find({ organization: organizationId }).exec();
  }

  async findOne(id: string): Promise<Room> {
    const room = this.roomModel
      .findById(id)
      .exec();
    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    return room;
  }

  async findByName(organizationId: string, name: string): Promise<Room> {
    await this.organizationsService.findOne(organizationId);
    const organizationRooms = await this.roomModel.find({ organization: organizationId }).exec();
    const room = organizationRooms.find(room => room.name === name);
    if (!room) {
      throw new NotFoundException(`Room with name ${name} not found`);
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();
  }
}