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
    res.cookie('token', accessToken, { httpOnly: true });
    res.status(200).json({ accessToken });
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies['token'];
  }

  async getUserFromCookie(request: Request): Promise<any> {
    const token = this.extractTokenFromCookies(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
