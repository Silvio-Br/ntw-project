import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {UsersDao} from "./dao/users.dao";
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {UserEntity} from "./entity/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

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

    create = (user: CreateUserDto): Observable<UserEntity> =>
        this._addUser(user).pipe(
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

    private _addUser = (
        user: CreateUserDto,
    ): Observable<CreateUserDto> =>
        of({
            ...user,
        });


}
