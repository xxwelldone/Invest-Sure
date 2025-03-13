import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o ID da ação' })
  public assetId: string;
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o ID da conta' })
  public accountId: string;
  @ApiProperty({ required: true })
  @IsPositive({ message: 'Informe uma quantidade maior que zero' })
  public qnt: number;
}
