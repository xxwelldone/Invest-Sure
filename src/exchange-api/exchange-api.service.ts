import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeRate } from './dto/ExchangeRate.dto';
import { error } from 'console';

@Injectable()
export class ExchangeApiService {
  constructor(private readonly config: ConfigService) {}

  private async GetAsync(baseCurrency: string): Promise<ExchangeRate> {
    const exchangeApiURL = this.config.get<string>('EXCHANGE_URL');
    const response = await fetch(`${exchangeApiURL}${baseCurrency}`);

    if (response.ok) {
      const result: ExchangeRate = await response.json();
      return result;
    } else {
      throw new error('Houve erro ao gravar dados cambiais');
    }
  }
  public async GetExchangeAsync(
    baseCurrency: string,
    buyingCurrency: string,
  ): Promise<number> {
    const exchangeRate: ExchangeRate = await this.GetAsync(baseCurrency);
    const price: number | undefined =
      exchangeRate.conversion_rates?.[buyingCurrency];

    if (price === undefined) {
      throw new Error(
        `A moeda ${buyingCurrency} não foi encontrada na conversão`,
      );
    }
    return price;
  }
}
