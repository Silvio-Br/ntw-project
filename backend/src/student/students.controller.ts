import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get, NotFoundException,
    Param,
    Post,
    Put, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags
} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {map, Observable} from "rxjs";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {HandlerParams} from "../users/validator/handler-param";
import {User} from "../users/schema/user.schema";
import {AuthService} from "../auth/auth.service";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('students')
@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentsController {

    constructor(private readonly _usersService: UsersService, private readonly _authService: AuthService) {
    }

    @ApiOkResponse({
        description: 'Returns an array of students',
        type: User,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No student exists in database'})
    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findAll(): Observable<User[] | void> {
        return this._usersService.findAllByRole('student');
    }

    @ApiOkResponse({
        description: 'Returns a student by id',
        type: User,
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param() params: HandlerParams): Observable<User | void> {
        return this._usersService.findOneByRoleAndId('student', params.id);
    }

    @ApiCreatedResponse({
        description: 'The student has been successfully created',
        type: User,
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('admin'))
    create(@Body() createPersonDto: CreateUserDto): Observable<User> {
        return this._usersService.create(createPersonDto, 'student');
    }

    @ApiOkResponse({
        description: 'The student has been successfully updated',
        type: User,
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('student'))
    update(@Param() params: HandlerParams, @Body() updatePersonDto: UpdateUserDto): Observable<{
        jwt: string;
        user: User
    }> {
        return this._usersService.update(params.id, updatePersonDto).pipe(
            map((user) => {
                if (user) {
                    // Générer un nouveau JWT avec les informations mises à jour de l'utilisateur
                    const payload = {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                    };
                    const nouveauJWT = this._authService.sign(payload);

                    // Retourner le nouveau JWT avec l'utilisateur mis à jour
                    return { user, jwt: nouveauJWT };
                } else {
                    // Gérer le cas où l'utilisateur n'a pas été trouvé
                    throw new NotFoundException('User with id "' + params.id + ' not found');
                }
            })
        );
    }

    @ApiOkResponse({
        description: 'The student has been successfully deleted',
        type: User,
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('admin'))
    delete(@Param() params: HandlerParams): Observable<User | void> {
        return this._usersService.delete(params.id);
    }
}
