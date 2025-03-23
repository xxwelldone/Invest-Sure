import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto, investorId: string) {
    const accountMapped = new Account();
    accountMapped.mappingFromCreateDTO(createAccountDto, investorId);
    const saved: Account = await this.accountRepo.save(accountMapped);
    return saved;
  }

  async findAll() {
    const list: Account[] = await this.accountRepo.find();
    return list;
  }
  async findAllByInvestorId(id: string): Promise<Account[]> {
    const account: Account[] = await this.accountRepo.find({
      where: { investorId: id },
    });
    return account;
  }

  async update(id: string, account: Partial<Account>) {
    const foundAccount: Account | null = await this.accountRepo.findOneBy({
      id: id,
    });

    if (foundAccount === null) {
      throw new Error('Conta não encontrada');
    }
    Object.assign(foundAccount, account);
    await this.accountRepo.save(foundAccount);
  }
}
