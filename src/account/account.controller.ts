import { Controller, UseGuards, Post, Body, Req, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequestDto } from '../auth/dto/AuthRequest.dto';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Req() req: AuthRequestDto,
  ) {
    const investorId = req.user.id;
    const saved = await this.accountService.create(
      createAccountDto,
      investorId,
    );
    return saved;
  }

  @Get()
  async findAll(@Req() req: AuthRequestDto): Promise<Account[]> {
    return await this.accountService.findAllByInvestorId(req.user.id);
  }
}
