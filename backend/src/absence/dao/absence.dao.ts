// absence.dao.ts

import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Absence} from '../schema/absence.schema';
import {AbsenceDto} from '../dto/absence.dto';
import {User} from "../../users/schema/user.schema";

@Injectable()
export class AbsenceDao {
    constructor(@InjectModel('Absence') private readonly absenceModel: Model<Absence>) {
    }

    async create(absenceDto: AbsenceDto): Promise<Absence> {
        const createdAbsence = new this.absenceModel(absenceDto);
        return createdAbsence.save();
    }

    async findAll(): Promise<Absence[]> {
        return this.absenceModel.find().exec();
    }

  async findById(id: string): Promise<Absence> {
    return this.absenceModel.findById(id).exec();
  }

    async update(id: string, absenceDto: AbsenceDto): Promise<Absence> {
        return this.absenceModel.findByIdAndUpdate(id, absenceDto, {new: true}).exec();
    }

    async delete(id: string): Promise<Absence> {
        return this.absenceModel.findByIdAndRemove(id).exec();
    }

    async findByProfessorId(professorId: string): Promise<Absence[]> {
        return this.absenceModel.find({enseignantId: professorId}).exec();
    }

    async findByStudentId(studentId: string): Promise<Absence[]> {
        return this.absenceModel.find({etudiantId: studentId}).exec();
    }

    async updateEtat(id: string, etat: string): Promise<Absence> {
        const updatedAbsence = await this.absenceModel.findByIdAndUpdate(
            id,
            {etat}, // Update only the etat property
            {new: true}
        ).exec();

        if (!updatedAbsence) {
            throw new Error(`Absence avec l'ID ${id} non trouvée.`);
        }

        return updatedAbsence;
    }
}
