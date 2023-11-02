// update-absence-etat.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAbsenceEtatDto {
  @ApiProperty({
    description: 'État de l\'absence',
    example: 'Justifiée',
  })
  @IsString()
  @IsNotEmpty()
  etat: string;
}
