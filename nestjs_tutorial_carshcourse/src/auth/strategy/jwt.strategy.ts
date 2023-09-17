import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: process.env.JWT_SECRET,
    });
  }
}
