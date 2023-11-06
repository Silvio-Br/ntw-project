import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Logger, NotFoundException,
    Param,
    Post, Put, Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {
    ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam, ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {User} from "./schema/user.schema";
import {AuthGuard} from "@nestjs/passport";
import {map, Observable} from "rxjs";
import {HandlerParams} from "./validator/handler-param";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthService} from "../auth/auth.service";
import {LoginAuthDto} from "../auth/dto/login-auth.dto";

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly _usersService: UsersService, private readonly _authService: AuthService) {
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

    @ApiOkResponse({
        description: 'Returns an array of students',
        type: User,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No student exists in database'})
    @Get('/students')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findAllStudents(): Observable<User[] | void> {
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
    @Get('/students/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findOneStudent(@Param() params: HandlerParams): Observable<User | void> {
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
    @Post('/students')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('admin'))
    createStudent(@Body() createPersonDto: CreateUserDto): Observable<User> {
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
    @Put('/students/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('student'))
    updateStudent(@Param() params: HandlerParams, @Body() updatePersonDto: UpdateUserDto): Observable<{
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
    @Delete('/students/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('admin'))
    deleteStudent(@Param() params: HandlerParams): Observable<User | void> {
        return this._usersService.delete(params.id);
    }

    @ApiOkResponse({
        description: 'Returns an array of professor',
        type: User,
        isArray: true,
    })
    @ApiNoContentResponse({ description: 'No professor exists in database' })
    @Get('/professors')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findAll(): Observable<User[] | void> {
        return this._usersService.findAllByRole('professor');
    }

    @ApiOkResponse({
        description: 'Returns a professor by id',
        type: User,
    })
    @ApiNotFoundResponse({ description: 'Professor with the given "id" not found' })
    @ApiBadRequestResponse({ description: 'Validation failed' })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the professor in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get('/professors/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findOneProfessor(@Param() params: HandlerParams): Observable<User | void> {
        return this._usersService.findOneByRoleAndId('professor', params.id);
    }

    @ApiCreatedResponse({
        description: 'The professor has been successfully created',
        type: User,
    })
    @ApiConflictResponse({
        description: 'The professor already exists in the database',
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiBody({
        description: 'Payload to create a new professor',
        type: CreateUserDto,
    })
    @Post('/professors')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('admin'))
    createProfessor(@Body() createPersonDto: CreateUserDto): Observable<User> {
        return this._usersService.create(createPersonDto, 'professor');
    }

    @ApiOkResponse({
        description: 'The professor has been successfully updated',
        type: User,
    })
    @ApiNotFoundResponse({
        description: 'Professor with the given "id" not found',
    })
    @ApiBadRequestResponse({
        description: 'Payload provided is not good',
    })
    @ApiBody({ description: 'Payload to update a professor', type: UpdateUserDto })
    @ApiParam({
        name: 'id',
        description: 'Id of the professor to update',
        type: String,
    })
    @Put('/professors/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    updateProfessor(@Param() params: HandlerParams, @Body() updatePersonDto: UpdateUserDto): Observable<{
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
        description: 'The professor has been successfully deleted',
        type: User,
    })
    @ApiNotFoundResponse({
        description: 'Professor with the given "id" not found',
    })
    @ApiBadRequestResponse({
        description: 'Payload provided is not good',
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the professor to delete',
        type: String,
        allowEmptyValue: false,
    })
    @Delete('/professors/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('admin'))
    deleteProfessor(@Param() { id }: HandlerParams): Observable<User | void> {
        return this._usersService.delete(id);
    }


}
