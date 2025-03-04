import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async create(createAssetDto: CreateAssetDto): Promise<Asset | undefined> {
    try {
      const newAsset = new Asset();
      newAsset.mappingFromCreateDTO(createAssetDto);
      const saved = await this.assetRepository.save(newAsset);
      return saved;
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(): Promise<Asset[] | undefined> {
    try {
      const list: Asset[] = await this.assetRepository.find();
      return list;
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
