import { Test } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schemas/users.schema";
import { userStub } from "./stubs/user.stub";
import { Model } from "mongoose";
import { CreateUserDto, UpdateUserDto } from "../dto/users.dto";


describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        }
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersService.findAll();
      });

      test('then it should call the userModel', () => {
        expect(userModel.find).toHaveBeenCalled();
      });

      test('then it should return an array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersService.findOne(userStub()._id as unknown as string);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findById).toHaveBeenCalledWith(userStub()._id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          admin: userStub().admin
        }
        user = await usersService.create(createUserDto);
      });

      test('then it should call the userModel', () => {
        expect(userModel.create).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto

      beforeEach(async () => {
        updateUserDto = {
          name: "Other Name",
        }
        user = await usersService.update(userStub()._id as unknown as string, updateUserDto);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(userStub()._id, updateUserDto, { new: true });
      });

      test('then it should return a user', () => {
        expect(user).toEqual({
          ...userStub(),
          ...updateUserDto
        });
      });
    });
  });
})

const mockUserModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([userStub()]),
  })),
  findById: jest.fn().mockImplementation((id) => ({
    exec: jest.fn().mockResolvedValue(userStub()),
  })),
  findByIdAndUpdate: jest.fn().mockImplementation((id, updateUserDto) => ({
    exec: jest.fn().mockResolvedValue({ ...userStub(), ...updateUserDto }),
  })),
  create: jest.fn().mockResolvedValue(userStub()),
};