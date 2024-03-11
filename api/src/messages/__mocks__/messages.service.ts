import { messageStub } from "../test/stubs/message.stub";

export const MessagesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(messageStub()),
  findAll: jest.fn().mockResolvedValue([messageStub()]),
  findOne: jest.fn().mockResolvedValue(messageStub()),
  update: jest.fn().mockResolvedValue(messageStub())
});