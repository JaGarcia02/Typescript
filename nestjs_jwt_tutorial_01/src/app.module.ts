import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './auth/common/guards';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
