import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [EmployeeModule, AuthModule, BankAccountModule, PrismaModule],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtService],
})
export class AppModule {}
