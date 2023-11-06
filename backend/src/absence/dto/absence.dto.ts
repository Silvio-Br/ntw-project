import {IsString, IsNotEmpty, IsDate, IsIn} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Exclude, Expose, Type} from "@nestjs/class-transformer";

export class AbsenceDto {
    @ApiProperty({
        description: 'ID de l\'enseignant',
        example: '5763cd4dc378a38ecd387737',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Type(() => String)
    enseignantId: string;

    @ApiProperty({
        description: 'ID de l\'étudiant',
        example: '5763cd4dc378a38ecd387738',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Type(() => String)
    etudiantId: string;

    @ApiProperty({
        description: 'État de l\'absence',
        example: 'Justifiée',
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['justified', 'unjustified', 'waiting'])
    @Expose()
    @Type(() => String)
    etat: string;

    @ApiProperty({
        description: 'Nom de la matière',
        example: 'Mathématiques',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Type(() => String)
    matiere: string;

    @ApiProperty({
        description: 'Date de l\'absence',
        example: '2023-10-23T10:00:00Z',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    dateAbsence: string;
    @IsString()
    @IsNotEmpty()
    @Expose()
    dateAbsenceto: string;
}
