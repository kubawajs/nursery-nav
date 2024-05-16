import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from 'process';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  var corsOptions = {
    origin: env.FRONTEND_URL,
    METHODS: 'GET',
    OPTIONS: 'GET',
  }
  app.enableCors(corsOptions);
  app.use(helmet());

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Nursery Nav API')
    .setDescription('API for Nursery Nav')
    .setVersion('1.0')
    .addTag('nursery-nav')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.15.2/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.15.2/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.15.2/swagger-ui-standalone-preset.js',
    ],
  });

  // Start the app
  await app.listen(3000);
}
bootstrap();
