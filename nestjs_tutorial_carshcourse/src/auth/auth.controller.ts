import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

// # This is the routes located

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // ---- auth/signup
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin') // ---- auth/signin
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
