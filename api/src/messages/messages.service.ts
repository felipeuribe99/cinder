import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
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

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { userId, roomId, ...messageBody } = createMessageDto;

    const user = await this.usersService.findOne(userId);
    const room = await this.roomsService.findOne(roomId);

    const message = this.messageModel.create({ ...messageBody, user, room });

    return message;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }
}