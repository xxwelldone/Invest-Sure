import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AuthGuard } from '../auth/auth.guard';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

describe('AssetController', () => {
  let controller: AssetController;
  let service: AssetService;

  const createAssetDto = new CreateAssetDto();
  createAssetDto.AssetName = 'Bitcoin';
  createAssetDto.TypeAsset = 'Cryptocurrency';
  createAssetDto.Price = 65000;
  createAssetDto.Currency = 'USD';
  const newAsset = new Asset();
  newAsset.id = '1a2b3c4d-1234-5678-9abc-def012345678';
  newAsset.CreatedAt = new Date();
  newAsset.mappingFromCreateDTO(createAssetDto);
  const assets: Asset[] = [
    Object.assign(new Asset(), {
      id: '1a2b3c4d-1234-5678-9abc-def012345678',
      CreatedAt: new Date(),
      AssetName: 'Bitcoin',
      TypeAsset: 'Cryptocurrency',
      Price: 65000,
      Currency: 'USD',
    }),
    Object.assign(new Asset(), {
      id: '2b3c4d5e-2345-6789-abcd-ef0123456789',
      CreatedAt: new Date(),
      AssetName: 'Tesla Stock',
      TypeAsset: 'Stock',
      Price: 750,
      Currency: 'USD',
    }),
    Object.assign(new Asset(), {
      id: '3c4d5e6f-3456-789a-bcde-f01234567890',
      CreatedAt: new Date(),
      AssetName: 'Gold',
      TypeAsset: 'Commodity',
      Price: 1900,
      Currency: 'USD',
    }),
    Object.assign(new Asset(), {
      id: '4d5e6f7g-4567-89ab-cdef-012345678901',
      CreatedAt: new Date(),
      AssetName: 'Ethereum',
      TypeAsset: 'Cryptocurrency',
      Price: 4000,
      Currency: 'USD',
    }),
    Object.assign(new Asset(), {
      id: '5e6f7g8h-5678-9abc-def0-123456789012',
      CreatedAt: new Date(),
      AssetName: 'Apple Stock',
      TypeAsset: 'Stock',
      Price: 150,
      Currency: 'USD',
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        {
          provide: AssetService,
          useValue: {
            create: jest.fn().mockResolvedValue(newAsset),
            findAll: jest.fn().mockResolvedValue(assets),
            findOne: jest
              .fn()
              .mockResolvedValue((id) =>
                assets.find((element) => element.id === id),
              ),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();
    controller = module.get<AssetController>(AssetController);
    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  it('should create an Asset with no errors', async () => {
    const result = await controller.create(createAssetDto);

    expect(result?.AssetName).toBe(createAssetDto.AssetName);
  });
  it('should return a list of assets', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toHaveLength(assets.length);
    expect(result).toEqual(assets);
  });
});
