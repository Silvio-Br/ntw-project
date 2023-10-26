import {Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly _authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this._authService.validateUserCredentials(email, password);
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }

}