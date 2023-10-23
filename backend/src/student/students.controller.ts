import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags
} from "@nestjs/swagger";
import {UserEntity} from "../users/entity/user.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Observable} from "rxjs";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {HandlerParams} from "../users/validator/handler-param";

@ApiTags('students')
@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentsController {

    constructor(private readonly _usersService: UsersService) {
    }

    @ApiOkResponse({
        description: 'Returns an array of students',
        type: UserEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No student exists in database'})
    @Get()
    findAll(): Observable<UserEntity[] | void> {
        return this._usersService.findAllByRole('student');
    }

    @ApiOkResponse({
        description: 'Returns a student by id',
        type: UserEntity,
    })
    @ApiNotFoundResponse({description: 'Student with the given "id" not found'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the student in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<UserEntity | void> {
        return this._usersService.findOneByRoleAndId('student', params.id);
    }

    @ApiCreatedResponse({
        description: 'The student has been successfully created',
        type: UserEntity,
    })
    @ApiConflictResponse({
        description: 'The student already exists in the database',
    })
    @ApiBadRequestResponse({description: 'Payload provided is not good'})
    @ApiBody({
        description: 'Payload to create a new student',
        type: CreateUserDto,
    })
    @Post()
    create(@Body() createPersonDto: CreateUserDto): Observable<UserEntity> {
        return this._usersService.create(createPersonDto, 'student');
    }

    @ApiOkResponse({
        description: 'The student has been successfully updated',
        type: UserEntity,
    })
    @ApiNotFoundResponse({
        description: 'Student with the given "id" not found',
    })
    @ApiBadRequestResponse({
        description: 'Payload provided is not good',
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the student in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({description: 'Payload to update a student', type: UpdateUserDto})
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updatePersonDto: UpdateUserDto): Observable<UserEntity | void> {
        return this._usersService.update(params.id, updatePersonDto);
    }

    @ApiOkResponse({
        description: 'The student has been successfully deleted',
        type: UserEntity,
    })
    @ApiNotFoundResponse({
        description: 'Student with the given "id" not found',
    })
    @ApiBadRequestResponse({
        description: 'Payload provided is not good',
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the student in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    delete(@Param() params: HandlerParams): Observable<UserEntity | void> {
        return this._usersService.delete(params.id);
    }
}
