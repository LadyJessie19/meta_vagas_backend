import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const docConfig = new DocumentBuilder()
    .setTitle('Meta Vagas Docs')
    .setDescription('In the documentation, it is possible to view and test all the available API paths and requests.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('v1/docs', app, document);

  app.setGlobalPrefix('v1/');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('APP_PORT') || 3003);
}
bootstrap();
