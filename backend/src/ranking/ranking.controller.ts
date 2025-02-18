import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Score } from '../score/score.entity';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking(): Promise<Score[]> {
    return this.rankingService.getRanking();
  }

  @Post(':userId')
  async addScore(
    @Param('userId') userId: number,
    @Body('score') score: number,
  ): Promise<Score> {
    return this.rankingService.addScore(userId, score);
  }
}