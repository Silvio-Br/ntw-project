import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            // delete obsolete data
            delete ret._id;
        },
    },
    versionKey: false,
})
export class User {
@Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    firstname: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    lastname: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    phone: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);