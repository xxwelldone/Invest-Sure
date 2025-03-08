import { Investor } from '../entities/investor.entity';

export class ResponseInvestorDto {
  public id: string;
  public name: string;
  public nacionality: string;
  public birthdate: Date;
  public email: string;

  constructor(investor: Investor) {
    this.id = investor.id;
    this.name = investor.name;
    this.nacionality = investor.nacionality;
    this.birthdate = investor.birthdate;
    this.email = investor.email;
  }
}
