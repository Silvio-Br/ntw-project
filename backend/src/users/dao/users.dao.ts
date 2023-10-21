import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {User} from "../schema/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {from, map, Observable} from "rxjs";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UsersDao {

    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>,
    ) {
    }

    find = (): Observable<User[]> =>
        from(this._userModel.find().exec()).pipe(map((users) => users.map((user) => user.toJSON())));

    findById = (id: string): Observable<User | void> =>
        from(this._userModel.findById(id).exec()).pipe(
            map((user) => {
                if (!user) {
                    return null;
                }
                return user.toJSON();
            })
        );


    save = (user: CreateUserDto): Observable<User> =>
        from(this._userModel.create(user)).pipe(map((user) => user.toJSON()));
}