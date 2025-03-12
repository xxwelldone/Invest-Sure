import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { Hasher } from 'src/pipes/Hasher';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequestDto } from 'src/auth/dto/AuthRequest.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('investor')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Post()
  create(
    @Body() createInvestorDto: CreateInvestorDto,
    @Body('password', Hasher) encrypted: string,
  ) {
    return this.investorService.create(createInvestorDto, encrypted);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('myinfo')
  async findMyData(@Req() req: AuthRequestDto) {
    const { id } = req.user;
    const investor = await this.investorService.findOneById(id);
    return investor;
  }
}
