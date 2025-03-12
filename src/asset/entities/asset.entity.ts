import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateAssetDto } from '../dto/create-asset.dto';
import { IsISO4217CurrencyCode } from 'class-validator';

@Entity({ name: 'asset' })
export class Asset {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id: string;
  @CreateDateColumn({
    name: 'createdat',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public CreatedAt: Date;
  @Column({ name: 'assetname', length: 40, nullable: false })
  public AssetName: string;
  @Column({ name: 'typeasset', length: 40, nullable: false })
  public TypeAsset: string;
  @Column({ name: 'price', type: 'numeric', nullable: false })
  public Price: number;
  @Column({ name: 'currency', length: 5, nullable: false })
  public Currency: string;

  mappingFromCreateDTO(createAssetDto: CreateAssetDto) {
    this.AssetName = createAssetDto.AssetName;
    this.TypeAsset = createAssetDto.TypeAsset;
    this.Price = createAssetDto.Price;
    this.Currency = createAssetDto.Currency;
  }
}
