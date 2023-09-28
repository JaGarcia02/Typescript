import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from 'src/utils/token.types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.signUp(authDto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.signIn(authDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@Req() req: Request) {
    const user = req.user;
    return this.authService.logOut(user['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refreshTokens')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['id'], user['refresh_token']);
  }
}
