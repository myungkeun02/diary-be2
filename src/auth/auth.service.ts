import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userModel: typeof User,
  ) {}

  async login(username: string, password: string) {
    // 사용자명과 비밀번호를 유효성 검사합니다 (예: 데이터베이스 확인)
    const isValid = await this.validateUser(username, password);
    if (!isValid) {
      throw new Error('유효하지 않은 사용자명 또는 비밀번호');
    } else {
      // JWT 토큰 생성
      const payload = { username };
      const token = this.jwtService.sign(payload);

      return token;
    }
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { username } });
    if (user && (await this.verifyPassword(password, user.password))) {
      return user;
    }
    return null;
  }
  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // 비밀번호 검증 로직을 구현합니다. 여기서는 단순히 비밀번호가 일치하는지만 확인합니다.
    return password === hashedPassword;
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { User } from '../models/user.model';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User)
//     private userModel: typeof User,
//     private jwtService: JwtService,
//   ) {}

// async validateUser(username: string, password: string): Promise<User> {
//   const user = await this.userModel.findOne({ where: { username } });
//   if (user && user.password === password) {
//     return user;
//   }
//   return null;
// }

//   async generateToken(user: User): Promise<string> {
//     const payload = { username: user.username };
//     return this.jwtService.sign(payload);
//   }

//   async validateToken(token: string): Promise<any> {
//     try {
//       return this.jwtService.verify(token);
//     } catch (error) {
//       throw new Error('Invalid token');
//     }
//   }
// }
