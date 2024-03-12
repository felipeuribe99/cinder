import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./schemas/messages.schema";
import { CreateMessageDto } from "./dto/messages.dto";

import { UsersService } from "../users/users.service";
import { RoomsService } from "../rooms/rooms.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) 
    private messageModel: Model<Message>,
    private usersService: UsersService,
    private roomsService: RoomsService,
  ) {}

  async create(userId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const { roomId, ...messageBody } = createMessageDto;

    const user = await this.usersService.findOne(userId);
    const room = await this.roomsService.findOne(roomId);

    const date = new Date();

    const message = this.messageModel.create({ ...messageBody, user, room, date });

    return message;
  }

  async findAll(roomId: string): Promise<Message[]> {
    await this.roomsService.findOne(roomId);
    return this.messageModel.find({ room: roomId }).populate('user').exec();
  }


  async findOne(id: string): Promise<Message> {
    const message = this.messageModel
      .findById(id)
      .exec();
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return message;
  }
}