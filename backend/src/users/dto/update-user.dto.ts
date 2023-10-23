import {ApiProperty} from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty, IsOptional,
    IsPhoneNumber,
    IsString, MinLength,
} from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        name: 'firstname',
        description: 'Firstname',
        example: 'Louis',
        required: false,
    })
    @IsString()
    @IsOptional()
    firstname: string;

    @ApiProperty({
        name: 'lastname',
        description: 'Lastname',
        example: 'Jacques',
        required: false,
    })
    @IsString()
    @IsOptional()
    lastname: string;

    @ApiProperty({
        name: 'email',
        description: 'Email',
        example: 'mail@mail.com',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({
        name: 'phone',
        description: 'Phone',
        example: '0606060606',
        required: false,
    })
    @IsOptional()
    @IsPhoneNumber('FR')
    phone: string;

}