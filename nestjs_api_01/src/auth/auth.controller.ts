import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth.signup.dto';
import { AuthSignInDto } from './dto/auth.signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getUsers() {
    return {};
  }

  @Post('signup')
  signUp(@Body() authSignUpDto: AuthSignupDto) {
    return this.authService.registerUser(authSignUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() authSinInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token_payload = await this.authService.loginUser(authSinInDto);
    res.header('access_token', token_payload.access_token);
    return token_payload;
  }
}
