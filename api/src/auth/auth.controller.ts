import { 
  Body, 
  Controller,
  Get, 
  HttpCode, 
  HttpStatus,
  Post, 
  Res,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: Record<string, any>, @Res() response: Response) {
    await this.authService.login(loginDto.email, loginDto.password, response);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: any) {
    return request.user;
  }

  @Post('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('token');
    response.status(200).send('Logged out');
  }
}