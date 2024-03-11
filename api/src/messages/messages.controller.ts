import { Controller, Get, Post, Param } from "@nestjs/common";
import { CreateMessageDto } from "./dto/messages.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  async create(createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }
}
