import { Controller, Get, Post, Param, UseGuards } from "@nestjs/common";
import { CreateMessageDto } from "./dto/messages.dto";
import { MessagesService } from "./messages.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(roomId: string) {
    return this.messagesService.findAll(roomId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.messagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(req: any, createMessageDto: CreateMessageDto) {
    const { userId } = req.user._id;
    return this.messagesService.create(userId, createMessageDto);
  }
}
