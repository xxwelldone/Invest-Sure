import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

import { InvestorModule } from '../investor/investor.module';

describe('AccountController', () => {
  let controller: AccountController;
  const mockAccountService = {
    // Mock das funções do serviço
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InvestorModule], // Mantemos outros módulos necessários
      controllers: [AccountController],
      providers: [
        { provide: AccountService, useValue: mockAccountService }, // Mockamos o serviço
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // it('should get all accounts from a investor', async () => {
  //   const mockReq: AuthRequestDto = {
  //     user: { id: 123 }, // Simula um usuário logado
  //   } as any;

  //   const result = await controller.findAll(mockReq);
  //   console.log(result);
  // });
});
