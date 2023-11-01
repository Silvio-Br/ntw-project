export type Absence = {
  id?: string;
  enseignantId: string;
  etudiantId: string;
  etat: string;
  date: Date;
  dateAbsence: Date;
  matiere: string;
};
