import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InvestorModule } from './investor/investor.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { InvestmentModule } from './investment/investment.module';
import { ExchangeApiService } from './exchange-api/exchange-api.service';
import { ExchangeApiModule } from './exchange-api/exchange-api.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandlerFilter } from './exception-handler/exception-handler.filter';

@Module({
  imports: [
    AssetModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
      inject: [TypeormService],
    }),
    InvestorModule,
    AuthModule,
    AccountModule,
    InvestmentModule,
    ExchangeApiModule,
  ],
  controllers: [],
  providers: [
    TypeormService,
    { provide: APP_FILTER, useClass: ExceptionHandlerFilter },
  ],
  exports: [],
})
export class AppModule {}
