import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator';
import { CustomResponse } from '../dtos/custom-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    return next
      .handle()
      .pipe(map((data: CustomResponse<T>) => this.responseHandler(data, ctx)));
  }

  responseHandler(data: any, ctx: ExecutionContext) {
    const { pagination, ...otherData } = data || {};

    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();
    const statusCode = res.statusCode;
    const timestamp = new Date();
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, ctx.getHandler()) ||
      'successfully';

    return {
      status: true,
      path: req.url,
      statusCode,
      message,
      timestamp,
      data: otherData,
      ...(pagination && { pagination }),
    };
  }
}
