import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

const ExtractJwtFromAuthHeader = ExtractJwt.fromAuthHeaderAsBearerToken();

const ExtractJwtFromCookie = (cookie_name: string) => (request: Request) => {
  let token = ExtractJwtFromAuthHeader(request);
  if (token) {
    delete request.cookies[cookie_name];
  } else if (request.cookies && request.cookies[cookie_name]) {
    token = request.cookies[cookie_name] as string;
  }
  return token;
};

interface JwtPayload {
  id: number;
  name: string;
  accessToken: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwtFromCookie('jwt'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    return {
      id: parseInt(payload.id),
      name: payload.name,
      accessToken: payload.accessToken,
    };
  }
}
