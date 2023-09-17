import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { dot } from 'node:test/reporters';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //  Convert the password to hash
    const hash = await argon.hash(dto.password);

    try {
      //  Save the new user to database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      //   remove the user password in the request
      delete user.password;

      // retutn the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken!');
        }
      }
      throw new ForbiddenException(error);
    }
  }

  async signin(dto: AuthDto) {
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

      //   remove the user password in the request
      delete user.password;

      // send back the user
      return user;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
