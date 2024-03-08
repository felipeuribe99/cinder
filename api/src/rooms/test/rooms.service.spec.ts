import { Test } from "@nestjs/testing";
import { RoomsService } from "../rooms.service";
import { getModelToken } from "@nestjs/mongoose";
import { Room } from "../schemas/rooms.schema";
import { roomStub } from "./stubs/room.stub";
import { Model } from "mongoose";
import { CreateRoomDto, UpdateRoomDto } from "../dto/rooms.dto";

import { OrganizationsService } from "../../organizations/organizations.service";


describe('RoomsService', () => {
  let roomsService: RoomsService;
  let roomModel: Model<Room>;

  let organizationsService: OrganizationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getModelToken(Room.name),
          useValue: mockRoomModel,
        },
        {
          provide: OrganizationsService,
          useValue: mockOrganizationsService,
        }
      ],
    }).compile();

    roomsService = module.get<RoomsService>(RoomsService);
    roomModel = module.get<Model<Room>>(getModelToken(Room.name));
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let rooms: Room[];

      beforeEach(async () => {
        rooms = await roomsService.findAll();
      });

      test('then it should call the roomModel', () => {
        expect(roomModel.find).toHaveBeenCalled();
      });

      test('then it should return an array of rooms', () => {
        expect(rooms).toEqual([roomStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let room: Room;

      beforeEach(async () => {
        room = await roomsService.findOne(roomStub()._id as unknown as string);
      });

      test('then it should call the roomModel', () => {
        expect(roomModel.findById).toHaveBeenCalledWith(roomStub()._id);
      });

      test('then it should return a room', () => {
        expect(room).toEqual(roomStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let room: Room;
      let createRoomDto: CreateRoomDto

      beforeEach(async () => {
        createRoomDto = {
          name: roomStub().name,
          organizationId: roomStub().organization._id as unknown as string,
        }
        room = await roomsService.create(createRoomDto);
      });

      test('then it should call the roomModel', () => {
        expect(roomModel.create).toHaveBeenCalledWith({
          name: createRoomDto.name,
          organization: roomStub().organization,
        });
      });

      test('then it should return a room', () => {
        expect(room).toEqual(roomStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let room: Room;
      let updateRoomDto: UpdateRoomDto

      beforeEach(async () => {
        updateRoomDto = {
          name: "Other Name",
        }
        room = await roomsService.update(roomStub()._id as unknown as string, updateRoomDto);
      });

      test('then it should call the roomModel', () => {
        expect(roomModel.findByIdAndUpdate).toHaveBeenCalledWith(roomStub()._id, updateRoomDto, { new: true });
      });

      test('then it should return a room', () => {
        expect(room).toEqual({
          ...roomStub(),
          name: updateRoomDto.name,
        });
      });
    });
  });
})

const mockRoomModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([roomStub()]),
  })),
  findById: jest.fn().mockImplementation((id) => ({
    exec: jest.fn().mockResolvedValue(roomStub()),
  })),
  findByIdAndUpdate: jest.fn().mockImplementation((id, updateRoomDto) => ({
    exec: jest.fn().mockResolvedValue({ ...roomStub(), ...updateRoomDto }),
  })),
  create: jest.fn().mockResolvedValue(roomStub()),
};

const mockOrganizationsService = {
  findOne: jest.fn().mockResolvedValue(roomStub().organization),
}