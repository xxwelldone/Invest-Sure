import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { InvestorModule } from 'src/investor/investor.module';
import * as dotenv from 'dotenv';
import { AuthGuard } from './auth.guard';

dotenv.config();
@Module({
  imports: [
    InvestorModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '3h',
        issuer: process.env.ISSUER,
        subject: process.env.SUBJECT,
      },
      verifyOptions: {
        ignoreExpiration: false,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
