import { Controller, Get, Post, Put, Param, UseGuards, Body, Request } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/:organizationId")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  async update(
    @Param("id") id: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @Request() req: any
  ) 
  {
    const { adminId } = req.user.sub;
    return this.usersService.update(id, updateUserDto, adminId);
  }
}
