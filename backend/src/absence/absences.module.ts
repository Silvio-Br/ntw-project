// src/absence/absences.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsencesController } from './absences.controller';
import { AbsencesService } from './absences.service';
import { AbsenceDao } from './dao/absence.dao';
import { Absence, AbsenceSchema } from './schema/absence.schema';

@Module({
    imports: [
      MongooseModule.forFeature([{ name :Absence.name, schema: AbsenceSchema }]),
    ],
    controllers: [AbsencesController],
    providers: [AbsencesService, AbsenceDao],
    
    
  })
  export class AbsencesModule {

    
  }