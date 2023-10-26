import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get, Logger,
    Param,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {

    constructor(private readonly _usersService: UsersService) {
    }


}
