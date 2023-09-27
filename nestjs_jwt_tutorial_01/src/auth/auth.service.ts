import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthTypes } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  signUp(authTypes: AuthTypes) {
    try {
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  signIn() {
    try {
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  logOut() {
    try {
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  refreshTokens() {
    try {
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
