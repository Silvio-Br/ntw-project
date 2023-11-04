import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";

@Injectable()
export class ProfessorStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'secretKey',
            }
        );
    }

    // validate if jwt is valid and user.role is professor
    async validate(payload: any) {
        if (payload.role === 'professor' || payload.role === 'admin') {
            return {email: payload.email};
        } else {
            return false;
        }
    }
}