import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthTypes } from 'src/utils';
import { Tokens } from 'src/utils/token.types';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signUp(authTypes: AuthTypes): Promise<Tokens> {
    try {
      const salt = await bcrypt.genSaltSync(10);
      const HashedPassword = await bcrypt.hashSync(authTypes.password, salt);

      const check_email = await this.prismaService.user.findFirst({
        where: { email: authTypes.email },
      });

      if (check_email) {
        throw new HttpException(
          'Email is already taken!',
          HttpStatus.FORBIDDEN,
        );
      }

      const newUser = await this.prismaService.user.create({
        data: {
          email: authTypes.email,
          password: HashedPassword,
        },
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async updateRtHash(userId: number, rt: string) {
    const salt = await bcrypt.genSaltSync(10);
    const HashedToken = await bcrypt.hashSync(rt, salt);

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: HashedToken,
      },
    });
  }

  async signIn(authTypes: AuthTypes): Promise<Tokens> {
    try {
      const check_email = await this.prismaService.user.findUnique({
        where: { email: authTypes.email },
      });

      if (!check_email) {
        throw new HttpException('Email not found!', HttpStatus.FORBIDDEN);
      }

      const passwordMatches = await bcrypt.compareSync(
        authTypes.password,
        check_email.password,
      );

      if (!passwordMatches) {
        throw new HttpException('Wrong password!', HttpStatus.FORBIDDEN);
      }

      const tokens = await this.getTokens(check_email.id, check_email.email);
      await this.updateRtHash(check_email.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async logOut(userId: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id: userId },
      });

      if (user.hashedRt == null) {
        throw new HttpException(
          `Something went wrong, Please try signing in again!`,
          HttpStatus.FORBIDDEN,
        );
      }
      await this.prismaService.user.updateMany({
        where: { id: userId, hashedRt: { not: null } },
        data: {
          hashedRt: null,
        },
      });

      return { message: 'User successfully logged out' };
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async refreshTokens(userId: number, rt: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException(
          `Something went wrong, please try again!`,
          HttpStatus.FORBIDDEN,
        );
      }

      const rt_Matched = await bcrypt.compareSync(rt, user.hashedRt);

      if (!rt_Matched) {
        throw new HttpException(
          `Something went wrong, please try again!`,
          HttpStatus.FORBIDDEN,
        );
      }

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
