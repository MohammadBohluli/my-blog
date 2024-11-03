import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';

type ClassConstructor = { new (...args: any[]): {} };

export const Serializer = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          // this line for serializing nested dto
          enableImplicitConversion: true,
        });
      }),
    );
  }
}
