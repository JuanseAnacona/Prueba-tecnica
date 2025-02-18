import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { QuestionsService } from './questions.service';
  import { CreateQuestionDto } from './dto/create-question.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Question } from './questions.entity';
  
  @Controller('questions')
  export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}
  
    // Endpoint para crear una pregunta (protegido por JWT)
    @Post()
    @UseGuards(JwtAuthGuard) // Protege la ruta con JWT
    async createQuestion(
      @Body() createQuestionDto: CreateQuestionDto,
      @Request() req,
    ): Promise<Question> {
      return this.questionsService.create(createQuestionDto);
    }
  
    // Endpoint para obtener preguntas por categoría
    @Get()
    async getQuestionsByCategory(
      @Query('category') category: string,
    ): Promise<Question[]> {
      return this.questionsService.findByCategory(category);
    }
  }