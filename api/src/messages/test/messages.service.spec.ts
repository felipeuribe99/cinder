import { Test } from "@nestjs/testing";
import { MessagesService } from "../messages.service";
import { getModelToken } from "@nestjs/mongoose";
import { Message } from "../schemas/messages.schema";
import { messageStub } from "./stubs/message.stub";
import { Model } from "mongoose";
import { CreateMessageDto } from "../dto/messages.dto";

import { UsersService } from "../../users/users.service";
import { RoomsService } from "../../rooms/rooms.service";


describe('MessagesService', () => {
  let messagesService: MessagesService;
  let messageModel: Model<Message>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: mockMessageModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: RoomsService,
          useValue: mockRoomsService,
        }
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    messageModel = module.get<Model<Message>>(getModelToken(Message.name));
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let messages: Message[];

      beforeEach(async () => {
        messages = await messagesService.findAll(messageStub().room._id as unknown as string);
      });

      test('then it should call the messageModel', () => {
        expect(messageModel.find).toHaveBeenCalled();
      });

      test('then it should return an array of messages', () => {
        expect(messages).toEqual([{
          ...messageStub(),
          date: expect.any(Date),
        }]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let message: Message;

      beforeEach(async () => {
        message = await messagesService.findOne(messageStub()._id as unknown as string);
      });

      test('then it should call the messageModel', () => {
        expect(messageModel.findById).toHaveBeenCalledWith(messageStub()._id);
      });

      test('then it should return a message', () => {
        expect(message).toEqual({
          ...messageStub(),
          date: expect.any(Date),
        });
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let message: Message;
      let createMessageDto: CreateMessageDto

      beforeEach(async () => {
        createMessageDto = {
          text: "Test Message",
          roomId: messageStub().room._id as unknown as string,
        }
        message = await messagesService.create(messageStub().user._id as unknown as string, createMessageDto);
      });

      test('then it should call the messageModel', () => {
        expect(messageModel.create).toHaveBeenCalledWith({
          text: createMessageDto.text,
          user: messageStub().user,
          room: messageStub().room,
          date: expect.any(Date),
        });
      });

      test('then it should return a message', () => {
        expect(message).toEqual({
          ...messageStub(),
          date: expect.any(Date),
        });
      });
    });
  });
})

const mockMessageModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([messageStub()]),
    populate: jest.fn().mockReturnThis(),
  })),
  findById: jest.fn().mockImplementation((id) => ({
    exec: jest.fn().mockResolvedValue(messageStub()),
  })),
  create: jest.fn().mockResolvedValue(messageStub()),
};

const mockUsersService = {
  findOne: jest.fn().mockResolvedValue(messageStub().user),
}

const mockRoomsService = {
  findOne: jest.fn().mockResolvedValue(messageStub().room),
}
