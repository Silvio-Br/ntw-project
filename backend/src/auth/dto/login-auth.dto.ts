import {ApiProperty} from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString, MinLength,
} from 'class-validator';

export class LoginAuthDto {

    @ApiProperty({
        name: 'email',
        description: 'Email',
        example: 'mail@mail.com',
    })
    @IsEmail()
    email: string;

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