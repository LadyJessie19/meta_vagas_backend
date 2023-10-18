import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const appPort = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const configOptions = new DocumentBuilder()
    .setTitle('Nestjs API for Arnia Meta-Vagas.')
    .setDescription(
      'This documentation is about the Meta_vagas application. Here you can view and test all available API paths and requests.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configOptions);
  SwaggerModule.setup('v1/docs', app, document);

  app.setGlobalPrefix('v1/');

  app.useGlobalPipes(new ValidationPipe());

  // await app.listen(configService.get('PORT') || 3001, '0.0.0.0');
  await app.listen(appPort, '0.0.0.0');
}
bootstrap();
