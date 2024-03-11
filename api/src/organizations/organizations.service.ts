import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./schemas/organizations.schema";
import { CreateOrganizationDto, UpdateOrganizationDto } from "./dto/organizations.dto";

@Injectable()
export class OrganizationsService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<Organization>) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationModel.create(createOrganizationDto);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }

  async findOne(id: string): Promise<Organization> {
    const organization = this.organizationModel
      .findById(id)
      .exec();
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationModel.findByIdAndUpdate(id, updateOrganizationDto, { new: true }).exec();
  }
}