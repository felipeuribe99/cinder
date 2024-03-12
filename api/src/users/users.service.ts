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

  async findAll(organizationId: string): Promise<User[]> {
    await this.organizationsService.findOne(organizationId);
    return this.userModel.find({ organization: organizationId }).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('organization')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    console.log('user', user);
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

  async update(
    id: string, 
    updateUserDto: UpdateUserDto, 
    adminId: string,
    isNewOrganization?: boolean,
  ): Promise<User> {
    const { organizationId, roomIds, ...userBody } = updateUserDto;
    const adminUser = await this.findOne(adminId);
    let user = await this.findOne(id);
    
    if (organizationId) {
      const organization = await this.organizationsService.findOne(organizationId);
      user.organization = organization;
    }

    if (roomIds) {
      await this.updateUserRooms(user, roomIds);
    }

    if (userBody.isApproved) {
      try {
        if (adminUser.admin || isNewOrganization) {
          user.isApproved = userBody.isApproved;
          const room = await this.roomsService.findByName(organizationId, "general");
          await this.updateUserRooms(user, [room._id.toString()]);
        } else {
          throw new NotFoundException(`User with id ${adminId} is not an admin`);
        }
      } catch (error) {
        throw new NotFoundException(`User without authorization to approve users`);
      }
    }

    if (userBody.admin) {
      try {
        if (adminUser.admin || isNewOrganization) {
          user.admin = userBody.admin;
        } else {
          throw new NotFoundException(`User with id ${adminId} is not an admin`);
        }
      } catch (error) {
        throw new NotFoundException(`User without authorization to approve users`);
      }
    }

    return await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  private async updateUserRooms(user: User, roomIds: string[]): Promise<User> {
    const userRoomIdsSet = new Set(user.rooms.map(room => room._id.toString()));

    const uniqueNewRoomIds = roomIds.filter(roomId => !userRoomIdsSet.has(roomId));

    for (const roomId of uniqueNewRoomIds) {
      const newRoom = await this.roomsService.findOne(roomId);
      if (newRoom) {
        user.rooms.push(newRoom);
      }
    }

    return user;
  }
}