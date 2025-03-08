import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InvestorService } from 'src/investor/investor.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly investorService: InvestorService,
    private readonly jwtService: JwtService,
  ) {}
  async authenticate(loginDto: LoginAuthDto) {
    const user = await this.investorService.findByEmail(loginDto.email);
    if (user === null) {
      throw new Error('Uusário não encontrado');
    }
    const isAuthenticated = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isAuthenticated) {
      throw new UnauthorizedException('Usuário não válido');
    }
    const payload: AuthDto = {
      id: user.id,
      email: user.email,
    };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
