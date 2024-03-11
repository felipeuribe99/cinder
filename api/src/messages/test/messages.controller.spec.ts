import { Test } from "@nestjs/testing";
import { MessagesController } from "../messages.controller";
import { MessagesService } from "../messages.service";
import { messageStub } from "./stubs/message.stub";
import { Message } from "../schemas/messages.schema";
import { CreateMessageDto } from "../dto/messages.dto";
import { JwtService } from "@nestjs/jwt";
import { FakeAuthModule } from "../../auth/__mocks__/fake-auth-module";

jest.mock("../messages.service");

describe('MessagesController', () => {
  let messagesController: MessagesController;
  let messagesService: MessagesService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [FakeAuthModule],
      controllers: [MessagesController],
      providers: [MessagesService, JwtService],
    }).compile(); 

    messagesController = module.get<MessagesController>(MessagesController);
    messagesService = module.get<MessagesService>(MessagesService);
    jest.clearAllMocks();
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let messages: Message[]

      beforeEach(async () => {
        messages = await messagesController.findAll(messageStub().room._id as unknown as string)
      })

      test('then it should call messagesService', () => {
        expect(messagesService.findAll).toHaveBeenCalled();
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
      let message: Message

      beforeEach(async () => {
        message = await messagesController.findOne(messageStub()._id as unknown as string)
      })

      test('then it should call messagesService', () => {
        expect(messagesService.findOne).toHaveBeenCalledWith(messageStub()._id as unknown as string);
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
      let createMessageDto: CreateMessageDto;

      beforeEach(async () => {
        createMessageDto = {
          text: messageStub().text,
          roomId: messageStub().room._id as unknown as string,
        };

        message = await messagesController.create(
        {
          user: { _id: messageStub().user._id },
        } as any,
        createMessageDto);
      });

      test('then it should call messagesService', () => {
        expect(messagesService.create).toHaveBeenCalledWith(
          undefined,
          createMessageDto
        );
      });

      test('then it should return a message', () => {
        expect(message).toEqual({
          ...messageStub(),
          date: expect.any(Date),
        });
      });
    });
  });
});