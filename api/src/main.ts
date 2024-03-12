import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

const PORT = parseInt(process.env.PORT) || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cinder API')
    .setDescription('The api of the new revolutionary chatting app Cinder.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors({ 
    origin: 'http://localhost:3002',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  try {
    await app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Error starting server, ${error}`);
  }
}
bootstrap();
