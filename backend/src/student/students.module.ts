import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import {UsersService} from "../users/users.service";
import {UsersDao} from "../users/dao/users.dao";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../users/schema/user.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UsersService, UsersDao],
  controllers: [StudentsController]
})
export class StudentsModule {}
