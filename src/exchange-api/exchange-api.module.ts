import { Module } from '@nestjs/common';
import { ExchangeApiService } from './exchange-api.service';

@Module({
  providers: [ExchangeApiService],
  exports: [ExchangeApiService],
})
export class ExchangeApiModule {}
