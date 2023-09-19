import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Token validation
  async validate(payload: { id: number; email: string }) {
    // The payload is where the request being sent in the headers

    // This will validate if the payload matched the user in the database
    const user_data = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    delete user_data.password;

    return user_data;
  }
}

// * This is like a middleware in Nodejs
