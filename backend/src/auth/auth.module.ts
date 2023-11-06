import {forwardRef, Logger, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {AdminStrategy} from "./strategy/admin.strategy";
import {ProfessorStrategy} from "./strategy/professor.strategy";
import {StudentStrategy} from "./strategy/student.strategy";

@Module({
  imports: [
      forwardRef(() => UsersModule),
      PassportModule,
      JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '1h' },
      })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminStrategy, ProfessorStrategy, StudentStrategy],
  exports: [AuthService],
})
export class AuthModule {}
