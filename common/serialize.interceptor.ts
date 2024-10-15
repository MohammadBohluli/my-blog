import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
