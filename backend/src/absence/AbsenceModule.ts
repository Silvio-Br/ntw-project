// src/absence/absence.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsenceController } from './AbsenceController';
import { AbsenceService } from './AbsenceService';
import { AbsenceDao } from './AbsenceDao';
import { Absence, AbsenceSchema } from './AbsenceSchema';

@Module({
    imports: [
      MongooseModule.forFeature([{ name :Absence.name, schema: AbsenceSchema }]),
    ],
    controllers: [AbsenceController],
    providers: [AbsenceService, AbsenceDao],
    
    
  })
  export class AbsenceModule {

    
  }