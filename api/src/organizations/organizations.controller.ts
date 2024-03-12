import { Controller, Get, Put, Param, Body, UseGuards } from "@nestjs/common";
import { UpdateOrganizationDto } from "./dto/organizations.dto";
import { OrganizationsService } from "./organizations.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.organizationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.organizationsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  async update(
    @Param("id") id: string, 
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }
}
