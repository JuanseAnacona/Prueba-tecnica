// src/score/score.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}