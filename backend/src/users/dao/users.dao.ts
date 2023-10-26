import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {User} from "../schema/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {from, map, Observable} from "rxjs";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

@Injectable()
export class UsersDao {

    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>,
    ) {
    }

    find = (): Observable<User[]> =>
        from(this._userModel.find().exec()).pipe(map((users) => users.map((user) => user.toJSON())));

    findByRoleAndId = (role: string, id: string): Observable<User | void> =>
        from(this._userModel.findOne({role: role, id: id}).exec()).pipe(
            map((user) => {
                    if (!user) {
                        return null;
                    }
                    return user.toJSON();
                }
            ));

    findByRole = (role: string): Observable<User[]> =>
        from(this._userModel.find({role: role}).exec()).pipe(map((users) => users.map((user) => user.toJSON())));

    findById = (id: string): Observable<User | void> =>
        from(this._userModel.findById(id).exec()).pipe(
            map((user) => {
                if (!user) {
                    return null;
                }
                return user.toJSON();
            })
        );

    findByEmailAndPassword = (email: string, password: string): Promise<User | undefined> =>
        this._userModel.findOne({email: email, password: password}).exec().then((user) => {
                if (!user) {
                    return undefined;
                }
                return user.toJSON();
            }
        );


    save = (user: CreateUserDto): Observable<User> =>
        from(this._userModel.create(user)).pipe(map((user) => user.toJSON()));

    update = (id: string, user: UpdateUserDto): Observable<User | void> =>
        from(this._userModel.findByIdAndUpdate(id, user, {new: true}).exec()).pipe(
            map((user) => {
                    if (!user) {
                        return null;
                    }
                    return user.toJSON();
                }
            ));

    delete = (id: string): Observable<User | void> =>
        from(this._userModel.findByIdAndRemove(id).exec()).pipe(
            map((user) => {
                if (!user) {
                    return null;
                }
                return user.toJSON();
            })
        );

}