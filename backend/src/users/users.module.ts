import {forwardRef, Logger, Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {UsersDao} from "./dao/users.dao";
import {User, UserSchema} from "./schema/user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "../auth/auth.module";
import {AbsenceSchema} from "../absence/schema/absence.schema";
import {MessageSchema} from "../messages/schema/message.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
            {name: 'Absence', schema: AbsenceSchema},
            {name: 'Message', schema: MessageSchema}
        ]),
        forwardRef(() => AuthModule),
    ],
    providers: [UsersService, Logger, UsersDao],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {
}
