import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
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

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async update(id: string, createRoomDto: UpdateRoomDto): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(id, createRoomDto, { new: true }).exec();
  }
}