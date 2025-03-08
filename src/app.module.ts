import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InvestorModule } from './investor/investor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AssetModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
      inject: [TypeormService],
    }),
    InvestorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [TypeormService],
})
export class AppModule {}
