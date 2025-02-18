// src/score/score.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from './score.entity';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post(':userId')
  async createScore(
    @Param('userId') userId: number,
    @Body('score') scoreValue: number,
  ): Promise<Score> {
    return this.scoreService.createScore(userId, scoreValue);
  }

  @Get('user/:userId')
  async getScoresByUser(@Param('userId') userId: number): Promise<Score[]> {
    return this.scoreService.getScoresByUser(userId);
  }

  @Get()
  async getAllScores(): Promise<Score[]> {
    return this.scoreService.getAllScores();
  }
}