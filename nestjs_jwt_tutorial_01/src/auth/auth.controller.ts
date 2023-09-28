import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from 'src/utils/token.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/local/signup')
  async signUp(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.signUp(authDto);
  }

  @Post('/local/signin')
  async signIn(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.signIn(authDto);
  }

  @Post('/logout')
  logOut() {
    return this.authService.logOut();
  }

  @Post('/refreshTokens')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
