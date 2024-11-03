import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomResponse } from './common/dtos/custom-response.dto';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PaginationDto } from './common/dtos/pagination.dto';

class Response<T> extends CustomResponse<T> {} // just for display document
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('appPort') || 3000;

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .addBearerAuth({ type: 'http' })
    .setTitle('My Blog API')
    .setDescription('This project is a personal blog api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Response],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
