import {Injectable, Logger} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly _usersService: UsersService,
                private readonly _jwtService: JwtService) {
    }

    async validateUserCredentials(email: string, pass: string): Promise<any> {
        const user = await this._usersService.findOneWithCredentials(email, pass);
        return user ?? null;
    }

    async loginWithCredentials(email: string, pass: string) {
        const user = await this.validateUserCredentials(email, pass);
        // remove password from user object
        delete user.password;
        delete user.id;
        const payload = user ?? null;
        return {
            access_token: this._jwtService.sign(payload),
        };
    }
}
