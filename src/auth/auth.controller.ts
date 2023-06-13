import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    return this.authService.validateUser(username, password, res);
  }

  @Post('a')
  async pas(@Body('password') password: string) {
    return this.authService.createHashPassword(password);
  }
}
