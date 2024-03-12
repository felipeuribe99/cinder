import { 
  Injectable, 
  Res, 
  UnauthorizedException 
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { jwtConstants } from "./constants";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(
    email: string, 
    password: string,
    @Res() res: Response
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, sub: user._id };
    const accessToken = await this.jwtService.signAsync(payload);
    res.cookie('token', accessToken);
    res.status(200).json({ accessToken });
  }
}
