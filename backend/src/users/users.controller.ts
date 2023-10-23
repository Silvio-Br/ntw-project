import {Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors} from '@nestjs/common';
import {UsersService} from "./users.service";
import {
    ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam
} from "@nestjs/swagger";
import {UserEntity} from "./entity/user.entity";
import {Observable} from "rxjs";
import {HandlerParams} from "./validator/handler-param";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {

    constructor(private readonly _usersService: UsersService) {
    }

}
