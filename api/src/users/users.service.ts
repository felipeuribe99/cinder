import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/users.schema";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";

import { OrganizationsService } from "../organizations/organizations.service";
import { RoomsService } from "../rooms/rooms.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private organizationsService: OrganizationsService,
    private roomsService: RoomsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userModel
      .findById(id)
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email: email
    }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, adminId?: string): Promise<User> {
    const { organizationId, roomIds, is_approved, ...userBody } = updateUserDto;
    const admin = await this.findOne(adminId);
    let user = await this.findOne(id);
    
    if (organizationId) {
      const organization = await this.organizationsService.findOne(organizationId);
      user.organization = organization;
    }

    if (roomIds) {
      for (const roomId of roomIds) {
        for (const room of user.rooms) {
          if (room._id.toString() === roomId) {
            const room = await this.roomsService.findOne(roomId);
            user.rooms.push(room);
          }
        }
      }
    }

    if (is_approved) {
      if (admin?.admin) {
        user.is_approved = is_approved;
      } else {
        throw new NotFoundException(`User with id ${adminId} is not an admin`);
      }
    }

    user = { ...user, ...userBody };

    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }
}