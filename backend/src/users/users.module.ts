import {forwardRef, Logger, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {UsersDao} from "./dao/users.dao";
import {User, UserSchema} from "./schema/user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthService} from "../auth/auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, Logger, UsersDao],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
