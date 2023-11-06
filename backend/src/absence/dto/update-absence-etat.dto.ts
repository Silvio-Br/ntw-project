// update-absence-etat.dto.ts
import {IsString, IsNotEmpty, IsIn} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import {Expose, Type} from "@nestjs/class-transformer";

export class UpdateAbsenceEtatDto {
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
}
