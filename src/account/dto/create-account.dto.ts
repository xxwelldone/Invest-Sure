import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsAlpha,
  IsISO4217CurrencyCode,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Informe agência de sua conta' })
  public accountAgency: string;
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Informe sua conta' })
  public accountNumber: string;
  @ApiProperty({ required: true })
  @IsString()
  public bank: string;
  @ApiProperty({ required: true })
  @IsAlpha()
  public country: string;
  @ApiProperty({ required: true, description: 'ISO Code Ex: USD, BRL, GBP' })
  @IsISO4217CurrencyCode({ message: 'ISO 4217 currency code' })
  public currency: string;
  @ApiProperty({
    required: true,
    description: 'If no amount is going to be passed, you can delete from JSON',
  })
  @IsOptional()
  @IsNumber()
  @Min(0.0)
  public amount: number;
}
