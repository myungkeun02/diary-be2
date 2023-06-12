import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(@Request() req) {
    console.log('Login!');
    return req.user;
  }ç
}
