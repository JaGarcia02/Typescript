import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtMiddleware } from './middleware/auth.jwt.middleware';

@Module({
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthJwtMiddleware).forRoutes({
      path: 'auth/login',
      method: RequestMethod.POST,
    });
  }
}
