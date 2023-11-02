import {Logger, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {UsersService} from "../users/users.service";
import {UsersDao} from "../users/dao/users.dao";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../users/schema/user.schema";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '60s' },
      })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}