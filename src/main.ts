import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception_filters/http-exception';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerInstance = app.get(Logger);
  // app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  app.useGlobalFilters(new HttpExceptionFilter()); //using for all routes in the application
  app.use(helmet());
  const PORT = 4000;
  // await app.listen(process.env.PORT ?? 3000);
  const config = new DocumentBuilder().setTitle(`Task_Mgt_API`).setDescription(`A RESTful API for managing tasks in a task management system. This API allows users to create, update, delete, and list tasks.`).setVersion(`1.0.0`).addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api`, app, document);

  await app.listen(PORT);
}
bootstrap();
