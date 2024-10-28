import { Module } from '@nestjs/common';
import { ArticlesController } from '../controllers/articles.controller';
import { ArticlesService } from '../services/articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
