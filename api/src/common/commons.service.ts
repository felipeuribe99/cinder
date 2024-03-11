import { Injectable, UnauthorizedException } from "@nestjs/common";
import { OrganizationsService } from "../organizations/organizations.service";
import { RoomsService } from "../rooms/rooms.service";
import { UsersService } from "../users/users.service";
import { CreateOrganizationDto } from "../organizations/dto/organizations.dto";
import { Organization } from "../organizations/schemas/organizations.schema";
import { CreateRoomDto } from "../rooms/dto/rooms.dto";
import { Room } from "../rooms/schemas/rooms.schema";


@Injectable()
export class CommonsService {
  constructor(
    private roomsService: RoomsService,
    private organizationsService: OrganizationsService,
    private usersService: UsersService,
  ) {}

  async createOrganization(userId: string, createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const user = await this.usersService.findOne(userId);
    const organization = await this.organizationsService.create(createOrganizationDto);
    const room = await this.roomsService.create({
      name: 'general',
      organizationId: organization._id as unknown as string,
    });
    await this.usersService.update(userId, {
      organizationId: organization._id as unknown as string,
      roomIds: [room._id as unknown as string],
      is_approved: true,
      admin: true,
    });
    return organization;
  }

  async createRoom(userId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const user = await this.usersService.findOne(userId);
    if (user.admin) {
      const room = await this.roomsService.create(createRoomDto);
      await this.usersService.update(userId, {
        roomIds: [room._id as unknown as string],
      });
      return room;
    } else {
      throw new UnauthorizedException('You are not authorized to create a room.')
    }
  }
}