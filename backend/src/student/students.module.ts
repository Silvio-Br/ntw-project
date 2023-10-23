import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import {UsersService} from "../users/users.service";
import {UsersDao} from "../users/dao/users.dao";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../users/schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [StudentsService, UsersService, UsersDao],
  controllers: [StudentsController]
})
export class StudentsModule {}
