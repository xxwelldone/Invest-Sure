import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateInvestmentDto {
  @IsNotEmpty({ message: 'É necessário informar o ID da ação' })
  public assetId: string;
  @IsNotEmpty({ message: 'É necessário informar o ID da conta' })
  public accountId: string;
  @IsPositive({ message: 'Informe uma quantidade maior que zero' })
  public qnt: number;
}
