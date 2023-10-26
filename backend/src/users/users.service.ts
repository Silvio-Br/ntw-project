import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {UsersDao} from "./dao/users.dao";
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./schema/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UsersService {

    constructor(private readonly _usersDao: UsersDao,
                @InjectModel('User') private readonly _userModel: Model<User>) {
    }

    findAll = (): Observable<User[] | void> =>
        this._usersDao.find().pipe(
            filter(Boolean),
            map((users) => (users || []).map((user) => new User(user))),
            defaultIfEmpty(undefined),
        );

    findOne = (id: string): Observable<User> =>
        this._usersDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user
                    ? of(new User(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + '" not found')
                    )
            )
        );

    findOneByRoleAndId = (role: string, id: string): Observable<User> =>
        this._usersDao.findByRoleAndId(role, id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user
                    ? of(new User(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + '" and role "' + role + '" not found')
                    )
            )
        );

    async findOneWithCredentials(email: string, password: string): Promise<User | undefined> {
        return this._usersDao.findByEmailAndPassword(email, password);
    }

    findAllByRole = (role: string): Observable<User[] | void> =>
        this._usersDao.findByRole(role).pipe(
            filter(Boolean),
            map((users) => (users || []).map((user) => new User(user))),
            defaultIfEmpty(undefined),
        );

    create = (user: CreateUserDto, role: string): Observable<User> =>
        this._addUser(user, role).pipe(
            mergeMap((newPreparedPerson: CreateUserDto) =>
                this._usersDao.save(newPreparedPerson),
            ),
            catchError((e) =>
                (e.code === 11000)
                    ? throwError(
                        () =>
                            new ConflictException(
                                `People with lastname '${user.lastname}' and firstname '${user.firstname}' already exists`,
                            ),
                    )
                    : throwError(() => new UnprocessableEntityException(e.message)),
            ),
            map((user) => new User(user)),
        );

    update = (id: string, user: UpdateUserDto): Observable<User | void> =>
        this._usersDao.update(id, user).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user
                    ? of(new User(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + ' not found')
                    )
            )
        );

    delete = (id: string): Observable<User | void> =>
        this._usersDao.delete(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user

                    ? of(new User(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + '" not found')
                    )
            )
        );

    private _addUser = (
        user: CreateUserDto, role: string,
    ): Observable<CreateUserDto> =>
        of({
            ...user,
            role: role
        });


}
