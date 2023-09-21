import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
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
  signIn(@Body() authSinInDto: AuthSignInDto) {
    return this.authService.loginUser(authSinInDto);
  }
}
