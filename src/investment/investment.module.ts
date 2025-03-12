import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { InvestorModule } from 'src/investor/investor.module';
import { AccountModule } from 'src/account/account.module';
import { AssetModule } from 'src/asset/asset.module';
import { AppModule } from 'src/app.module';
import { ExchangeApiModule } from 'src/exchange-api/exchange-api.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Investment]),
    InvestorModule,
    AccountModule,
    AssetModule,
    ExchangeApiModule,
  ],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
