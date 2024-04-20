import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entites/promotion.entity';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion]), ImageModule],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
