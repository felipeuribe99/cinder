import { roomStub } from "../test/stubs/room.stub";

export const RoomsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(roomStub()),
  findAll: jest.fn().mockResolvedValue([roomStub()]),
  findOne: jest.fn().mockResolvedValue(roomStub()),
  update: jest.fn().mockResolvedValue(roomStub())
});