import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column({ name: 'accountagency', nullable: false, length: 20 })
  public accountAgency: string;
  @Column({ name: 'accountnumber', nullable: false, length: 20 })
  public accountNumber: string;
  @Column({ nullable: false, length: 20 })
  public bank: string;
  @Column({ nullable: false, length: 40 })
  public country: string;
  @Column({ nullable: false, length: 5 })
  public currency: string;
  @Column({ nullable: false, type: 'numeric' })
  public amount: number;
  @Column({ name: 'investor_id', nullable: false, type: 'uuid' })
  public investorId: string;

  @CreateDateColumn({ name: 'createdat' })
  public createdAt: Date;

  public Withdraw(withdraw: number): void {
    if (withdraw > 0.0 && this.amount >= withdraw) {
      this.amount -= withdraw;
    } else {
      throw new Error('Operação não autorizada');
    }
  }
  public mappingFromCreateDTO(
    createAccountDto: CreateAccountDto,
    investorId: string,
  ) {
    this.accountAgency = createAccountDto.accountAgency;
    this.accountNumber = createAccountDto.accountNumber;
    this.bank = createAccountDto.bank;
    this.country = createAccountDto.country;

    if (!createAccountDto.amount) {
      this.amount = 0.0;
    } else {
      this.amount = createAccountDto.amount;
    }
    this.currency = createAccountDto.currency;
    this.investorId = investorId;
    this.createdAt = new Date();
  }
}
