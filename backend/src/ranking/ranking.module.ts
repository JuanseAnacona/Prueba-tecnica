import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { Score } from '../score/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}