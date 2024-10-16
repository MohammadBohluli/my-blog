import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomResponse } from 'src/types/custom-response.type';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    return next
      .handle()
      .pipe(map((data: unknown) => this.responseHandler(data, ctx)));
  }

  responseHandler(data: any, ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();
    const statusCode = res.statusCode;
    const timestamp = new Date();

    return { status: true, path: req.url, statusCode, data, timestamp };
  }
}
