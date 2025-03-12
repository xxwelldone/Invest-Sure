import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { InvestorService } from 'src/investor/investor.service';
import { AuthRequestDto } from './dto/AuthRequest.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly investService: InvestorService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequestDto>();

    const token = this.extractToken(req);
    if (token === null) {
      throw new UnauthorizedException('Usuário não validado');
    }
    try {
      const payload: AuthDto = await this.jwtService.verifyAsync(token);
      const user = this.investService.findByEmail(payload.email);
      if (user !== null) {
        req.user = payload;
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Usuário não está válido');
    }
  }
  private extractToken(req: Request): string | null {
    const [authType, token] = req.headers.authorization?.split(' ') ?? [];
    return authType === 'Bearer' ? token : null;
  }
}
