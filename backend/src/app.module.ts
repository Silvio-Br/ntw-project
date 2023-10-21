import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {StudentModule} from './student/student.module';
import {ProfessorModule} from './professor/professor.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as Config from 'config';

@Module({
    imports: [
        UsersModule,
        StudentModule,
        ProfessorModule,
        MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    ],
})
export class AppModule {
}
