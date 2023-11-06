import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import * as Config from 'config';

import { MessagesModule } from './messages/messages.module';
import {AbsenceModule} from "./absence/absence.module";


@Module({
    imports: [
        UsersModule,
        MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
        AuthModule,
        AbsenceModule,
        MessagesModule,
    ],
})
export class AppModule {
}
