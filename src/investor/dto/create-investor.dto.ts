import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxDate,
} from 'class-validator';

export class CreateInvestorDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Campo não deve ser vazio' })
  public name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Campo não deve ser vazio' })
  @IsAlpha()
  public nacionality: string;
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Campo não pode ser vazio' })
  public birthdate: Date;
  @ApiProperty({ required: true })
  @IsEmail()
  public email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Campo não deve ser vazio' })
  public password: string;
}
