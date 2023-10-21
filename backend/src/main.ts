import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types';
import {Logger, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {UsersModule} from "./users/users.module";

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
  );

  await app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  );

    const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .build();

    // create swagger document
    const userDocument = SwaggerModule.createDocument(app, options, {
        include: [UsersModule],
    });

    // setup swagger module
    SwaggerModule.setup(swaggerConfig.path, app, userDocument);

  await app.listen(config.port, config.host);
  Logger.log(
      `Application served at http://${config.host}:${config.port}`,
      'bootstrap',
  );
}
bootstrap(
    Config.get<AppConfig>('server'),
    Config.get<SwaggerConfig>('swagger'),
);
