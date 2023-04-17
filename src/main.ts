import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryErrorFilter } from './QueryErrorFilter.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new QueryErrorFilter(httpAdapter));

  const config = new DocumentBuilder().setTitle("Aerlytix technical assessment")
    .setDescription("Technical assessment for aerlytix")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('/', app, document)
  await app.listen(3000);
}
bootstrap();
