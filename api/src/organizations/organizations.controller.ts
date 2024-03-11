import { Controller, Get, Post, Put, Param, Body } from "@nestjs/common";
import { CreateOrganizationDto, UpdateOrganizationDto } from "./dto/organizations.dto";
import { OrganizationsService } from "./organizations.service";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findAll() {
    return this.organizationsService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.organizationsService.findOne(id);
  }

  @Put("/:id")
  async update(
    @Param("id") id: string, 
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }
}
