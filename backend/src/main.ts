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
import {AuthModule} from "./auth/auth.module";
import {AbsenceModule} from "./absence/absence.module";
import {MessagesModule} from "./messages/messages.module";
import * as multer from 'multer';
import {AdminStrategy} from "./auth/strategy/admin.strategy";
import {ProfessorStrategy} from "./auth/strategy/professor.strategy";
import {StudentStrategy} from "./auth/strategy/student.strategy";
import {LocalStrategy} from "./auth/strategy/local.strategy";
import {JwtStrategy} from "./auth/strategy/jwt.strategy";


async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({logger: true}),
    );
    //app.setGlobalPrefix('api')
    
    app.use(
        session({
            secret: "keyboard",
            resave: false,
            saveUninitialized: false,
        })
    )
    passport.use('admin', new AdminStrategy)
    passport.use('professor', new ProfessorStrategy)
    passport.use('student', new StudentStrategy)
    passport.use('jwt', new JwtStrategy())


    app.use(passport.initialize())
    app.use(passport.session())
    app.enableCors();
    
    await app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads'); // Define the destination directory for file uploads
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      });
      app.use(multer({ storage: storage }).any());
    const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .build();

    // create swagger document
    const userDocument = SwaggerModule.createDocument(app, options, {
        include: [ProfessorsModule, StudentsModule, AbsenceModule, MessagesModule, AuthModule],
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
