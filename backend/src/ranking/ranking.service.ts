import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../score/score.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async getRanking(): Promise<Score[]> {
    return this.scoreRepository.find({
      relations: ['user'],
      order: { score: 'DESC' },
      take: 10,
    });
  }

  async addScore(userId: number, score: number): Promise<Score> {
    const newScore = this.scoreRepository.create({
      score,
      user: { id: userId },
      timestamp: new Date(),
    });
    return this.scoreRepository.save(newScore);
  }
}