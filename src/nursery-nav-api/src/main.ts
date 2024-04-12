import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  var corsOptions = {
    origin: env.FRONTEND_URL,
  }
  app.enableCors(corsOptions);

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Nursery Nav API')
    .setDescription('API for Nursery Nav')
    .setVersion('1.0')
    .addTag('nursery-nav')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the app
  await app.listen(3000);
}
bootstrap();
