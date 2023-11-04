import { Injectable } from '@nestjs/common';
import { AbsenceDao } from './AbsenceDao';
import { AbsenceDto } from './AbsenceDto';
import { Absence } from './AbsenceSchema';
import { UpdateAbsenceEtatDto } from './UpdateAbsenceEtatDto ';

@Injectable()
export class AbsenceService {
  constructor(private readonly absenceDao: AbsenceDao) {}

  async create(absenceDto: AbsenceDto): Promise<Absence> {
    try {
      return await this.absenceDao.create(absenceDto);
    } catch (error) {
      throw new Error('Erreur lors de la création de labsence.');
    }
  }

  async findAll(): Promise<Absence[]> {
    try {
      return await this.absenceDao.findAll();
    } catch (error) {
      throw new Error('Erreur lors de la récupération de toutes les absences.');
    }
  }

  async findById(id: string): Promise<Absence> {
    try {
      return await this.absenceDao.findById(id);
    } catch (error) {
      throw new Error(`Absence avec l'ID ${id} non trouvée.`);
    }
  }

  async update(id: string, absenceDto: AbsenceDto): Promise<Absence> {
    try {
      return await this.absenceDao.update(id, absenceDto);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'absence avec l'ID ${id}.`);
    }
  }

  async delete(id: string): Promise<Absence> {
    try {
      return await this.absenceDao.delete(id);
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'absence avec l'ID ${id}.`);
    }
  }

  async findByProfessorId(professorId: string): Promise<Absence[]> {
    try {
      return await this.absenceDao.findByProfessorId(professorId);
    } catch (error) {
      throw new Error(`Erreur lors de la recherche des absences pour le professeur avec l'ID ${professorId}.`);
    }
  }

  async findByStudentId(studentId: string): Promise<Absence[]> {
    try {
      return await this.absenceDao.findByStudentId(studentId);
    } catch (error) {
      throw new Error(`Erreur lors de la recherche des absences pour l'étudiant avec l'ID ${studentId}.`);
    }
  }

  async updateEtat(id: string, etat: string): Promise<Absence> {
    try {
      return await this.absenceDao.updateEtat(id, etat);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'etat de l'absence avec l'ID ${id}.`);
    }
  }
}