import {Body, Controller, Get, Param, Post} from '@nestjs/common';
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
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly _usersService: UsersService) {}

    @ApiOkResponse({
        description: 'Returns an array of users',
        type: UserEntity,
        isArray: true,
    })
    @ApiNoContentResponse({ description: 'No user exists in database' })
    @Get()
    findAll(): Observable<UserEntity[] | void> {
        return this._usersService.findAll();
    }

    @ApiOkResponse({
        description: 'Returns the user for the given "id"',
        type: UserEntity,
    })
    @ApiNotFoundResponse({
        description: 'User with the given "id" doesn\'t exist in the database',
    })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the user in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<UserEntity> {
        return this._usersService.findOne(params.id);
    }

    @ApiCreatedResponse({
        description: 'The user has been successfully created',
        type: UserEntity,
    })
    @ApiConflictResponse({
        description: 'The user already exists in the database',
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiBody({
        description: 'Payload to create a new user',
        type: CreateUserDto,
    })
    @Post()
    create(@Body() createPersonDto: CreateUserDto): Observable<UserEntity> {
        return this._usersService.create(createPersonDto);
    }


}
