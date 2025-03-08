import { Injectable } from '@nestjs/common';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Investor } from './entities/investor.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { ResponseInvestorDto } from './dto/response-investor.dto';

@Injectable()
export class InvestorService {
  constructor(
    @InjectRepository(Investor)
    private readonly investorRepo: Repository<Investor>,
  ) {}

  async create(createInvestorDto: CreateInvestorDto, encrypted: string) {
    const investor: Investor | null = await this.investorRepo.findOne({
      where: { email: createInvestorDto.email },
    });
    if (investor != null) {
      throw new error('Usuário já cadastrado anteriormente');
    } else {
      const investorToBeSaved = new Investor();
      investorToBeSaved.mappingFromCreateDTO(createInvestorDto, encrypted);
      const saved = await this.investorRepo.save(investorToBeSaved);
      const response = new ResponseInvestorDto(saved);
      return response;
    }
  }

  findAll() {
    return `This action returns all investor`;
  }

  async findByEmail(email: string): Promise<Investor | null> {
    const investor = await this.investorRepo.findOneBy({
      email: email,
    });
    return investor;
  }

  findOne(id: number) {
    return `This action returns a #${id} investor`;
  }

  update(id: number, updateInvestorDto: UpdateInvestorDto) {
    return `This action updates a #${id} investor`;
  }

  remove(id: number) {
    return `This action removes a #${id} investor`;
  }
}
