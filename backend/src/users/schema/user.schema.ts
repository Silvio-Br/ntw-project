import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            // delete obsolete data
        },
    },
    versionKey: false,
})
@Exclude()
export class User {
    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737',
    })
    @Type(() => String)
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    @Expose()
    _id: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    @ApiProperty({
        name: 'firstname',
        description: 'Firstname',
        example: 'Louis',
    })
    @Type(() => String)
    @Expose()
    firstname: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    @ApiProperty({
        name: 'lastname',
        description: 'Lastname',
        example: 'Jacques',
    })
    @Type(() => String)
    @Expose()
    lastname: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    @ApiProperty({
        name: 'email',
        description: 'Email',
        example: 'mail@mail.com',
    })
    @Type(() => String)
    @Expose()
    email: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    @ApiProperty({
        name: 'phone',
        description: 'Phone',
        example: '0606060606',
    })
    @Type(() => String)
    @Expose()
    phone: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    @Type(() => String)
    @Exclude()
    password: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    @Type(() => String)
    @Exclude()
    role: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);