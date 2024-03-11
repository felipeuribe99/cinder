import { Test } from "@nestjs/testing";
import { RoomsController } from "../rooms.controller";
import { RoomsService } from "../rooms.service";
import { roomStub } from "./stubs/room.stub";
import { Room } from "../schemas/rooms.schema";
import { CreateRoomDto, UpdateRoomDto } from "../dto/rooms.dto";

jest.mock("../rooms.service");

describe('RoomsController', () => {
  let roomsController: RoomsController;
  let roomsService: RoomsService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [RoomsController],
      providers: [RoomsService],
    }).compile(); 

    roomsController = module.get<RoomsController>(RoomsController);
    roomsService = module.get<RoomsService>(RoomsService);
    jest.clearAllMocks();
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let rooms: Room[]

      beforeEach(async () => {
        rooms = await roomsController.findAll(roomStub().organization._id as unknown as string)
      })

      test('then it should call roomsService', () => {
        expect(roomsService.findAll).toHaveBeenCalled();
      });

      test('then it should return an array of rooms', () => {
        expect(rooms).toEqual([roomStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let room: Room

      beforeEach(async () => {
        room = await roomsController.findOne(roomStub()._id as unknown as string)
      })

      test('then it should call roomsService', () => {
        expect(roomsService.findOne).toHaveBeenCalledWith(roomStub()._id as unknown as string);
      });

      test('then it should return a room', () => {
        expect(room).toEqual(roomStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let room: Room
      let updateRoomDto: UpdateRoomDto

      beforeEach(async () => {
        updateRoomDto = {
          name: 'Other Name',
        }
        room = await roomsController.update(roomStub()._id as unknown as string, updateRoomDto)
      })

      test('then it should call roomsService', () => {
        expect(roomsService.update).toHaveBeenCalledWith(roomStub()._id as unknown as string, updateRoomDto);
      });

      test('then it should return a room', () => {
        expect(room).toEqual(roomStub());
      });
    });
  })
});