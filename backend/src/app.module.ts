import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {StudentsModule} from './student/students.module';
import {ProfessorsModule} from './professor/professors.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import * as Config from 'config';
import { AbsenceModule } from './absence/AbsenceModule';
import { MessagesModule } from './messages/MessagesModule';


@Module({
    imports: [
        UsersModule,
        StudentsModule,
        ProfessorsModule,
        MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
        AuthModule,
        AbsenceModule,
        MessagesModule,
     
    ],
})
export class AppModule {
}
