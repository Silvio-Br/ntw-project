import mongoose from "mongoose";

export const AbsenceSchema = new mongoose.Schema({
    enseignantId: { type: String, required: true },
    etudiantId: { type: String, required: true },
    etat: { type: String, required: true },
    matiere: { type: String, required: true }, // Ajout du champ pour le nom de la matière
    date: { type: Date, default: Date.now },
    dateAbsence: { type: String, required:true },
    dateAbsenceto: { type: String, required:true },

  });
  export class Absence extends mongoose.Document {
    enseignantId: string;
    etudiantId: string;
    etat: string;
    date: Date;
    dateAbsence: Date;
  }