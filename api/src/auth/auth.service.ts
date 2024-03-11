import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(
    email: string, 
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
