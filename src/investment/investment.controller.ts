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
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequestDto } from 'src/auth/dto/AuthRequest.dto';

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
