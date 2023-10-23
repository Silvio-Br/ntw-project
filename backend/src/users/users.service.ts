import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {UsersDao} from "./dao/users.dao";
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {UserEntity} from "./entity/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(private readonly _usersDao: UsersDao) {
    }

    findAll = (): Observable<UserEntity[] | void> =>
        this._usersDao.find().pipe(
            filter(Boolean),
            map((users) => (users || []).map((user) => new UserEntity(user))),
            defaultIfEmpty(undefined),
        );

    findOne = (id: string): Observable<UserEntity> =>
        this._usersDao.findById(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user
                    ? of(new UserEntity(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + '" not found')
                    )
            )
        );

    findOneByRoleAndId = (role: string, id: string): Observable<UserEntity> =>
        this._usersDao.findByRoleAndId(role, id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user
                    ? of(new UserEntity(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + '" and role "' + role + '" not found')
                    )
            )
        );

    findAllByRole = (role: string): Observable<UserEntity[] | void> =>
        this._usersDao.findByRole(role).pipe(
            filter(Boolean),
            map((users) => (users || []).map((user) => new UserEntity(user))),
            defaultIfEmpty(undefined),
        );

    create = (user: CreateUserDto, role: string): Observable<UserEntity> =>
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
            map((user) => new UserEntity(user)),
        );

    update = (id: string, user: UpdateUserDto): Observable<UserEntity | void> =>
        this._usersDao.update(id, user).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user
                    ? of(new UserEntity(user))
                    : throwError(
                        () => new NotFoundException('User with id "' + id + ' not found')
                    )
            )
        );

    delete = (id: string): Observable<UserEntity | void> =>
        this._usersDao.delete(id).pipe(
            catchError((e) =>
                throwError(() => new UnprocessableEntityException(e.message)),
            ),
            mergeMap((user) =>
                !!user

                    ? of(new UserEntity(user))
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
            role: role,
        });


}
