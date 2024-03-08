import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/users.schema";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";

import { OrganizationsService } from "../organizations/organizations.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private organizationsService: OrganizationsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { organizationId, ...userBody } = updateUserDto;
    const organization = await this.organizationsService.findOne(organizationId);
    
    let user = await this.findOne(id);

    if (organization) {
      user.organization = organization;
    } else {
      user.organization = user.organization;
    }

    user = { ...user, ...userBody };

    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }
}