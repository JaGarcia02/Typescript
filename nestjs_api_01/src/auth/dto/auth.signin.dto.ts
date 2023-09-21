import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
