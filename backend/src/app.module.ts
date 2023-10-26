import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {StudentsModule} from './student/students.module';
import {ProfessorsModule} from './professor/professors.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import * as Config from 'config';

@Module({
    imports: [
        UsersModule,
        StudentsModule,
        ProfessorsModule,
        MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
        AuthModule,
    ],
})
export class AppModule {
}
