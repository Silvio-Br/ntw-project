import {Body, Controller, Post, UseGuards, Request, Logger, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {LoginAuthDto} from "./dto/login-auth.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) {

    }


    @ApiOkResponse({
        description: 'Login successful, returns token',
        type: String,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiUnauthorizedResponse({description: 'Invalid credentials'})
    @ApiBody({
        description: 'Login credentials',
        type: LoginAuthDto,
    })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        const {email, password} = req.body;
        return this._authService.loginWithCredentials(email, password);
    }

}
