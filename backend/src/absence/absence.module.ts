// src/absence/absence.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsenceController } from './absence.controller';
import { AbsenceService } from './absence.service';
import { AbsenceDao } from './dao/absence.dao';
import { Absence, AbsenceSchema } from './schema/absence.schema';
import { EmailService } from './email.service';
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
      MongooseModule.forFeature([{ name :Absence.name, schema: AbsenceSchema }]),
        UsersModule
    ],
    controllers: [AbsenceController],
    providers: [AbsenceService, AbsenceDao,EmailService],
    
    
  })
  export class AbsenceModule {

    
  }