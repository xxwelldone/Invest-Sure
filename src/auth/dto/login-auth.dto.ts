import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public email: string;
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public password: string;
}
