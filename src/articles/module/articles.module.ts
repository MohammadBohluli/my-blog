import { Module } from '@nestjs/common';
import { ArticlesController } from '../controllers/articles.controller';
import { ArticlesService } from '../services/articles.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesModule } from 'src/categories/module/categories.module';

@Module({
  imports: [PrismaModule, CategoriesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
