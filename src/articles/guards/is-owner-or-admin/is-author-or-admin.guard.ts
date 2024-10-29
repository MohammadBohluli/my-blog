import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ArticlesService } from 'src/articles/services/articles.service';

@Injectable()
export class IsAuthorOrAdminGuard implements CanActivate {
  constructor(private readonly articleService: ArticlesService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const currentUser = req.user;
    const articleId = parseInt(req.params.articleId);
    const article = await this.articleService.findById(articleId);

    const isUserAdmin = currentUser?.role === 'ADMIN';
    const isAuthorUser = currentUser?.userId === article.authorId;

    if (isUserAdmin || isAuthorUser) {
      return true;
    }

    return false;
  }
}
