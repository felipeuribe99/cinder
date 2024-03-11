import { Controller, Get, Post, Param, UseGuards, Request, Body } from "@nestjs/common";
import { CreateMessageDto } from "./dto/messages.dto";
import { MessagesService } from "./messages.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/:roomId')
  async findAll(
    @Param('roomId') roomId: string
  ) {
    return this.messagesService.findAll(roomId);
  }

  @Get("/:id")
  async findOne(
    @Param("id") id: string
  ) {
    return this.messagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req: any, 
    @Body() createMessageDto: CreateMessageDto
  ) {
    const userId = req.user.sub;
    return this.messagesService.create(userId, createMessageDto);
  }
}
