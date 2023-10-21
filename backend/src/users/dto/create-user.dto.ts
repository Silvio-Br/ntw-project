import {ApiProperty} from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString, MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        name: 'firstname',
        description: 'Firstname',
        example: 'Louis',
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({
        name: 'lastname',
        description: 'Lastname',
        example: 'Jacques',
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        name: 'email',
        description: 'Email',
        example: 'mail@mail.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        name: 'phone',
        description: 'Phone',
        example: '0606060606',
    })
    @IsPhoneNumber('FR')
    phone: string;

    @ApiProperty({
        name: 'password',
        description: 'Password',
        example: 'password',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;

}