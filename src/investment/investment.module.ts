import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { AccountModule } from '../account/account.module';
import { AssetModule } from '../asset/asset.module';
import { ExchangeApiModule } from '../exchange-api/exchange-api.module';
import { InvestorModule } from '../investor/investor.module';

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
