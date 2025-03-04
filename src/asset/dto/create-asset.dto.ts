import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Campo não deve ser vazio' })
  public AssetName: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public TypeAsset: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive({ message: 'Valor não deve ser negativo' })
  public Price: number;
  @ApiProperty({ required: true })
  @IsISO4217CurrencyCode({ message: 'Currency deve seguir o padrão ISO 4217' })
  public Currency: string;
}
