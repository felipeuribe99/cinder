import { Test } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { userStub } from "./stubs/user.stub";
import { User } from "../schemas/users.schema";
import { CreateUserDto, UpdateUserDto } from "../dto/create-user.dto";

jest.mock("../users.service");

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile(); 

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[]

      beforeEach(async () => {
        users = await usersController.findAll()
      })

      test('then it should call usersService', () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });

      test('then it should return an array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User

      beforeEach(async () => {
        user = await usersController.findOne(userStub()._id as unknown as string)
      })

      test('then it should call usersService', () => {
        expect(usersService.findOne).toHaveBeenCalledWith(userStub()._id as unknown as string);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          admin: userStub().admin
        }
        user = await usersController.create(createUserDto)
      })

      test('then it should call usersService', () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let user: User
      let updateUserDto: UpdateUserDto

      beforeEach(async () => {
        updateUserDto = {
          name: 'Other Name',
        }
        user = await usersController.update(userStub()._id as unknown as string, updateUserDto)
      })

      test('then it should call usersService', () => {
        expect(usersService.update).toHaveBeenCalledWith(userStub()._id as unknown as string, updateUserDto);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  })
});