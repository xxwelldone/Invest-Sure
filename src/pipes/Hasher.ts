import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class Hasher implements PipeTransform {
  async transform(password: string) {
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
