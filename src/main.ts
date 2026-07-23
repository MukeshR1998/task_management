import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfig } from './config/config.type';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

const apiDocumentationCredentials = {
  name: 'admin',
  pass: 'admin',
};

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.use('/api-docs', (req, res, next) => {
    function parseAuthHeader(input: string): { name: string; pass: string } {
      const [, encodedPart] = input.split(' ');
      const buff = Buffer.from(encodedPart, 'base64');
      const text = buff.toString('ascii');
      const [name, pass] = text.split(':');
      return { name, pass };
    }

    function unauthorizedResponse(): void {
      if (httpAdapter.getType() === 'fastify') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
      } else {
        res.status(401);
        res.set('WWW-Authenticate', 'Basic');
        res.end();
      }
      next();
    }

    if (!req.headers.authorization) {
      return unauthorizedResponse();
    }
    const credentials = parseAuthHeader(req.headers.authorization);
    if (
      credentials?.name !== apiDocumentationCredentials.name ||
      credentials?.pass !== apiDocumentationCredentials.pass
    ) {
      return unauthorizedResponse();
    }
    next();
  });

  const configService = app.get(ConfigService<AllConfig>);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle('Election_Backend API')
    .setDescription('Listing of all APIs')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Bearer Token',
    )
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'user-agent',
      schema: {
        example: 'provided value',
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(
    configService.getOrThrow('app.port', { infer: true }),
    '0.0.0.0',
    () =>
      Logger.debug(
        `server is running on ${configService.get('app.port', {
          infer: true,
        })}`,
      ),
  );
}

bootstrap();
