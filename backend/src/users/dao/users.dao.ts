import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {User} from "../schema/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {from, map, mergeMap, Observable} from "rxjs";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";
import * as bcrypt from 'bcrypt';
import {Message} from "../../messages/schema/message.schema";
import {Absence} from "../../absence/schema/absence.schema";

@Injectable()
export class UsersDao {

    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>,
        @InjectModel(Absence.name)
        private readonly _absenceModel: Model<Absence>,
        @InjectModel(Message.name)
        private readonly _messageModel: Model<Message>,
    ) {
    }

    find = (): Observable<User[]> =>
        from(this._userModel.find().exec()).pipe(map((users) => users.map((user) => user.toJSON())));

    findByRoleAndId = (role: string, id: string): Observable<User | void> =>
        from(this._userModel.findOne({role: role, _id: id}).exec()).pipe(
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

    async findByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        const user = await this._userModel.findOne({ email: email }).exec();
        if (!user) {
            return undefined; // L'utilisateur n'existe pas
        }

        // Utilisez bcrypt pour vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return undefined; // Le mot de passe est incorrect
        }

        return user.toJSON();
    }


    save = (user: CreateUserDto): Observable<User> =>
        // check if email already exists
        from(this._userModel.findOne({email: user.email}).exec()).pipe(
            map((user) => {
                if (user) {
                    throw new Error('Email "' + user.email + '" already exists');
                }
            }),
            mergeMap(() => from(this._userModel.create(user))),
            map((user) => user.toJSON()),
        );

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
                this._messageModel.deleteMany({from: user._id}).exec();
                this._messageModel.deleteMany({to: user._id}).exec();
                if (user.role === 'etudiant') {
                    this._absenceModel.deleteMany({etudiantId: user._id}).exec();
                } else {
                    this._absenceModel.deleteMany({enseignantId: user._id}).exec();
                }

                return user.toJSON();
            })
        );

}