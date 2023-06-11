import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;
    const token = await this.authService.login(username, password);
    return { token };
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedRoute() {
    // 이 경로는 JWT 인증으로 보호됩니다.
    // 유효한 JWT로 인증된 요청만이 이 경로에 접근할 수 있습니다.
    return '이는 보호된 경로입니다.';
  }
}

// import { Controller, Post, Body, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')

// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(
//     @Body('username') username: string,
//     @Body('password') password: string,
//   ) {
//     const user = await this.authService.validateUser(username, password);
//     if (user) {
//       // 로그인 성공 처리
//       const token = await this.authService.generateToken(user);
//       return { token, message: '로그인 성공!' };
//     } else {
//       // 로그인 실패 처리
//       return { message: '로그인 실패!' };
//     }
//   }
// }
