import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      // 로그인 성공 처리
      return { message: '로그인 성공' };
    } else {
      // 로그인 실패 처리
      return { message: '로그인 실패' };
    }
  }
}
