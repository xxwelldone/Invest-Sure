import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequestDto } from 'src/auth/dto/AuthRequest.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    const saved = await this.accountService.create(createAccountDto);
    return saved;
  }

  @Get()
  async findAll(@Req() req: AuthRequestDto): Promise<Account[]> {
    return await this.accountService.findAllByInvestorId(req.user.id);
  }
}
