import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Response, response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    res: Response,
  ): Promise<any> {
    const user = await this.findByLogin(username);

    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      const accessToken = await this.jwtService.sign(result);
      result['token'] = accessToken;
      res.cookie('token', accessToken, {
        httpOnly: true,
        maxAge: 86400000,
      });
      res.redirect('/home');
    }
    return null;
  }

  async findByLogin(username: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new ForbiddenException('아이디와 비밀번호를 다시 확인해주세요.');
    }
    return user;
  }

  createHashPassword(password: string) {
    const hashpassword = hashSync(password, 10);
    return hashpassword;
  }
}
