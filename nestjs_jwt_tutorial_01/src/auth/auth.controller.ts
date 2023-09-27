import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/local/signup')
  signUp() {
    this.authService.signUp();
  }

  @Post('/local/signin')
  signIn() {
    this.authService.signIn();
  }

  @Post('/logout')
  logOut() {
    this.authService.logOut();
  }

  @Post('/refreshTokens')
  refreshTokens() {
    this.authService.refreshTokens();
  }
}
