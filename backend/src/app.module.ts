import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { RankingModule } from './ranking/ranking.module';
import { WebSocketsModule } from './websockets/websockets.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Ruta al archivo .env
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "juan",
      database: "trivia_db",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    QuestionsModule,
    RankingModule,
    WebSocketsModule,
    ScoreModule,
  ],
})
export class AppModule {}
