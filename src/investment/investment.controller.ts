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
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';

import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequestDto } from '../auth/dto/AuthRequest.dto';

@Controller('investment')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  create(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @Req() req: AuthRequestDto,
  ) {
    const id: string = req.user.id;
    return this.investmentService.create(createInvestmentDto, id);
  }
  @Get()
  async GetAll(@Req() req: AuthRequestDto) {
    const { id } = req.user;
    return await this.investmentService.findAll(id);
  }
}
