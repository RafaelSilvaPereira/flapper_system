import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/AppModule';
import { ValidationExceptionFilter } from './infra/filters/exception_filters/ValidationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(3000);
}

bootstrap();
