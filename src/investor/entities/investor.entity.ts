import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateInvestorDto } from '../dto/create-investor.dto';
import { IsNotEmpty } from 'class-validator';

@Entity('investor')
export class Investor {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id: string;
  @Column({ name: 'name', length: 100, nullable: false })
  public name: string;
  @Column({ name: 'nacionality', length: 100, nullable: false })
  public nacionality: string;
  @Column({ name: 'birthdate', type: 'date' })
  public birthdate: Date;
  @Column({ name: 'email', length: 40, nullable: false })
  public email: string;
  @Column({ name: 'password', nullable: false })
  public password: string;

  mappingFromCreateDTO(createDto: CreateInvestorDto, hashedPw: string) {
    this.name = createDto.name;
    this.nacionality = createDto.nacionality;
    this.birthdate = createDto.birthdate;
    this.email = createDto.email;
    this.password = hashedPw;
  }
}
