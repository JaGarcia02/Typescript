import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/local/signup')
  async signUp(@Body() authDto: AuthDto) {
    await this.authService.signUp(authDto);
  }

  @Post('/local/signin')
  async signIn(@Body() authDto: AuthDto) {
    await this.authService.signIn();
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
