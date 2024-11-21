import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception_filters/http-exception';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerInstance = app.get(Logger);
  // app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  app.useGlobalFilters(new HttpExceptionFilter()); //using for all routes in the application
  app.use(helmet());
  const PORT = process.env.PORT || 4000;
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(PORT);
}
bootstrap();
