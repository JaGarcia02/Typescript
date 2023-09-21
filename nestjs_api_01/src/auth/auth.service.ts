import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpTypes } from 'src/utils/auth_utils/signup.types';
import { LoginTypes } from 'src/utils/auth_utils/login.types';
import { AuthSignupDto } from './dto/auth.signup.dto';
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async registerUser(signupTypes: SignUpTypes) {
    try {
      //   check if email is available
      const check_email_availability = await this.prismaService.user.findFirst({
        where: { email: signupTypes.email },
      });
      if (check_email_availability) {
        throw new HttpException(
          'Email is already taken!',
          HttpStatus.FORBIDDEN,
        );
      }
      // check if username is available
      const check_username_availability =
        await this.prismaService.user.findFirst({
          where: { username: signupTypes.username },
        });
      if (check_username_availability) {
        throw new HttpException(
          'Username is already taken!',
          HttpStatus.FORBIDDEN,
        );
      }

      const HashedPassword = await argon.hash(signupTypes.password);

      const created_user = await this.prismaService.user.create({
        data: {
          username: signupTypes.username,
          email: signupTypes.email,
          password: HashedPassword,
          role: signupTypes.role,
        },
      });
      return created_user;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async loginUser(loginTypes: LoginTypes) {
    try {
      const check_email = await this.prismaService.user.findUnique({
        where: { email: loginTypes.email },
      });

      const check_username = await this.prismaService.user.findUnique({
        where: { username: loginTypes.username },
      });

      if (!check_email || !check_username) {
        throw new HttpException(
          'Email and Username not found, please try again!',
          HttpStatus.FORBIDDEN,
        );
      }

      const password_match_emailLogin = bcrypt.compareSync(
        check_email.password,
        loginTypes.password,
      );
      const password_match_usernameLogin = bcrypt.compareSync(
        check_username.password,
        loginTypes.password,
      );

      if (!password_match_emailLogin || !password_match_usernameLogin) {
      }

      return {
        message: 'User login Successfully',
        user: check_email || check_username,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
