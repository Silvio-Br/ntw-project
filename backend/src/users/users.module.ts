import {Logger, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {UsersDao} from "./dao/users.dao";
import {User, UserSchema} from "./schema/user.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, Logger, UsersDao],
  controllers: [UsersController]
})
export class UsersModule {}
