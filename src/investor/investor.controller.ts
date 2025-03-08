import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvestorService } from './investor.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Hasher } from 'src/pipes/Hasher';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
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

  @Get()
  findAll() {
    return this.investorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    return this.investorService.update(+id, updateInvestorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorService.remove(+id);
  }
}
