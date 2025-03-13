import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { AuthRequestDto } from 'src/auth/dto/AuthRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { In, Repository } from 'typeorm';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';
import { Asset } from 'src/asset/entities/asset.entity';
import { AssetService } from 'src/asset/asset.service';
import { error } from 'console';
import { ExchangeApiService } from 'src/exchange-api/exchange-api.service';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private investmentRepo: Repository<Investment>,
    private accountService: AccountService,
    private assetService: AssetService,
    private exchangeRateAPI: ExchangeApiService,
  ) {}
  async create(
    createInvestmentDto: CreateInvestmentDto,
    id: string,
  ): Promise<Investment> {
    const accounts: Account[] =
      await this.accountService.findAllByInvestorId(id);
    const index: number = accounts.findIndex(
      (account) => account.id === createInvestmentDto.accountId,
    );

    if (index < 0) {
      throw new Error('Conta não pertence ao usuário ou não existe');
    }
    const account: Account = accounts[index];

    const asset: Asset | null = await this.assetService.findOne(
      createInvestmentDto.assetId,
    );

    if (asset === null) {
      throw new error('Asset não foi encontrado para completar compra');
    }
    const exchangePrice = await this.exchangeRateAPI.GetExchangeAsync(
      account.currency,
      asset.Currency,
    );
    const amount: number = asset.Price * createInvestmentDto.qnt;
    const total = amount * exchangePrice;
    if (account.amount < total) {
      throw new Error('Saldo insuficiente para completar investimento');
    } else {
      account.Withdraw(total);
      await this.accountService.update(account.id, account);
      const investment: Investment = new Investment();
      investment.assetId = asset.id;
      investment.assetName = asset.AssetName;
      investment.createdAt = new Date();
      investment.accountid = account.id;
      investment.currency = asset.Currency;
      investment.investimentType = asset.TypeAsset;
      investment.quantity = createInvestmentDto.qnt;
      investment.totalAmount = amount;
      const investmentCreated = await this.investmentRepo.save(investment);
      return investmentCreated;
    }
  }
  async findAll(investorId: string): Promise<Investment[]> {
    const accounts: Account[] =
      await this.accountService.findAllByInvestorId(investorId);

    const accountIds: string[] = accounts.map((account) => account.id);
    return await this.investmentRepo.find({
      where: { accountid: In(accountIds) },
    });
  }
}
