// src/score/score.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createScore(userId: number, scoreValue: number): Promise<Score> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const newScore = this.scoreRepository.create({
      score: scoreValue,
      user,
      timestamp: new Date(),
    });

    return this.scoreRepository.save(newScore);
  }

  async getScoresByUser(userId: number): Promise<Score[]> {
    return this.scoreRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async getAllScores(): Promise<Score[]> {
    return this.scoreRepository.find({ relations: ['user'] });
  }
}