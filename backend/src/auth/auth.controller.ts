import {Body, Controller, Post, UseGuards, Request, Logger, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) {

    }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        const {email, password} = req.body;
        return this._authService.loginWithCredentials(email, password);
    }

}
