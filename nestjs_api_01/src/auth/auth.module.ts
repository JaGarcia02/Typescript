import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthJwtMiddleware).forRoutes({
  //     path: 'auth/login',
  //     method: RequestMethod.POST,
  //   });
  // }
}
