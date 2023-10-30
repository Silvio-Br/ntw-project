import { IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "@nestjs/class-transformer";

export class CreateMessageDto {
    @ApiProperty({
        description: 'Sender ID',
        example: '5763cd4dc378a38ecd387737',
    })
    @IsString()
    @IsOptional()
    @Expose()
    @Type(() => String)
    from?: string;

    @ApiProperty({
        description: 'Recipient ID',
        example: '5763cd4dc378a38ecd387738',
    })
    @IsString()
    @IsOptional()
    @Expose()
    @Type(() => String)
    to?: string;

    @ApiProperty({
        description: 'Message content',
        example: 'Hello, how are you?',
    })
    @IsString()
    @IsOptional()
    @Expose()
    @Type(() => String)
    message?: string;

    @ApiProperty({
        description: 'Message date',
        example: '2023-10-23T10:00:00Z',
    })
    @IsDate()
    @IsOptional()
    @Expose()
    @Type(() => Date)
    date?: Date;
}
