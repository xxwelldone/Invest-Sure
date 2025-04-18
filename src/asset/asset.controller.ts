import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Asset } from './entities/asset.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async create(
    @Body() createAssetDto: CreateAssetDto,
  ): Promise<Asset | undefined> {
    return await this.assetService.create(createAssetDto);
  }

  @Get()
  findAll(): Promise<Asset[] | undefined> {
    return this.assetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Asset | null> {
    return this.assetService.findOne(id);
  }
}
