import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentService } from './investment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { Account } from '../account/entities/account.entity';
import { AccountService } from '../account/account.service';
import { AssetService } from '../asset/asset.service';
import { Asset } from '../asset/entities/asset.entity';
import { ExchangeApiService } from '../exchange-api/exchange-api.service';
import { Repository } from 'typeorm';

describe('InvestmentService', () => {
  let service: InvestmentService;

  let accountService: AccountService;
  let assetService: AssetService;
  let exchangeRateAPI: ExchangeApiService;
  let repo: Repository<Investment>;
  const investment: Investment = {
    id: '550e8400-e29b-41d4-a716-446655440003',
    investimentType: 'Stocks',
    assetName: 'Apple Inc.',
    assetId: '2f920e82-f7d7-41ef-9da4-fe3654b13e05',
    quantity: 10,
    accountid: '12345-abcde',
    totalAmount: 1500.75,
    currency: 'USD',
    createdAt: new Date(),
  };
  const investorId = 'a1b2c3d4-e5f6-7890-g1h2-345678901234';

  const asset = Object.assign(new Asset(), {
    id: '2f920e82-f7d7-41ef-9da4-fe3654b13e05',
    AssetName: 'Ethereum',
    TypeAsset: 'Criptomoeda',
    Price: 2000.75,
    Currency: 'USD',
    CreatedAt: new Date('2025-03-04T16:00:45.222Z'),
  });

  const accounts: Account[] = [
    Object.assign(new Account(), {
      id: '1',
      accountAgency: '001',
      accountNumber: '123456-7',
      bank: 'Bank A',
      country: 'USA',
      currency: 'USD',
      amount: 5000.0,
      investorId: investorId,
      createdAt: new Date(),
    }),
    Object.assign(new Account(), {
      id: '2',
      accountAgency: '002',
      accountNumber: '765432-1',
      bank: 'Bank B',
      country: 'Brazil',
      currency: 'BRL',
      amount: 10000.0,
      investorId: investorId,
      createdAt: new Date(),
    }),
    Object.assign(new Account(), {
      id: '3',
      accountAgency: '003',
      accountNumber: '987654-3',
      bank: 'Bank C',
      country: 'UK',
      currency: 'GBP',
      amount: 7500.0,
      investorId: investorId,
      createdAt: new Date(),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentService,
        {
          provide: getRepositoryToken(Investment),
          useValue: {
            save: jest.fn().mockResolvedValue(investment),
          },
        },
        {
          provide: AccountService,
          useValue: {
            findAllByInvestorId: jest.fn().mockResolvedValue(accounts),
            update: jest.fn().mockResolvedValue(accounts[2]),
          },
        },
        {
          provide: AssetService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(asset),
          },
        },
        {
          provide: ExchangeApiService,
          useValue: {
            GetExchangeAsync: jest.fn().mockResolvedValue(12.5844),
          },
        },
      ],
    }).compile();

    service = module.get<InvestmentService>(InvestmentService);
    accountService = module.get<AccountService>(AccountService);
    assetService = module.get<AssetService>(AssetService);
    exchangeRateAPI = module.get<ExchangeApiService>(ExchangeApiService);
    repo = module.get(getRepositoryToken(Investment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(accountService).toBeDefined();
    expect(assetService).toBeDefined();
    expect(exchangeRateAPI).toBeDefined();
    expect(repo).toBeDefined();
  });
});
