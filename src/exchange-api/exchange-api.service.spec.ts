import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeApiService } from './exchange-api.service';

describe('ExchangeApiService', () => {
  let service: ExchangeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeApiService],
    }).compile();

    service = module.get<ExchangeApiService>(ExchangeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
