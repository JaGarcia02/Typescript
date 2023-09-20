import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, AuthSigninDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    //  Convert the password to hash
    const hash = await argon.hash(dto.password);

    try {
      //  Save the new user to database
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hash,
        },
      });

      // retutn the saved user
      return this.signToken(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.password,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken!');
        }
      }
      throw new ForbiddenException(error);
    }
  }

  async signin(dto: AuthSigninDto) {
    try {
      // Find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      // if user don't exist throw error
      if (!user) {
        throw new ForbiddenException("Email dosen't exist!");
      }

      // compare password
      const password_match = await argon.verify(user.password, dto.password);
      // if password incorrect throw error
      if (!password_match) {
        throw new ForbiddenException('Wrong password!');
      }

      // send back the user
      return this.signToken(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.password,
      );
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  // this is where we sign the token
  async signToken(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<{ access_token: string }> {
    // the payload content
    const payload = {
      id: userId,
      firstName,
      lastName,
      password,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
