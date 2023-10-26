import {NestFactory} from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import * as Config from 'config';
import {AppConfig, SwaggerConfig} from './app.types';
import {Logger, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ProfessorsModule} from "./professor/professors.module";
import {StudentsModule} from "./student/students.module";
import * as passport from "passport";
import * as session from "express-session";


async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({logger: true}),
    );
    app.use(
        session({
            secret: "keyboard",
            resave: false,
            saveUninitialized: false,
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

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
        .build();

    // create swagger document
    const userDocument = SwaggerModule.createDocument(app, options, {
        include: [ProfessorsModule, StudentsModule],
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
