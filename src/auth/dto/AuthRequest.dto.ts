import { Request } from 'express';
import { AuthDto } from './auth.dto';

export interface AuthRequestDto extends Request {
  user: AuthDto;
}
