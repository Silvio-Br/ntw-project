export class Absence {
    constructor(
      public enseignantId: string,
      public etudiantId: string,
      public etat: string,
      public matiere: string,
      public dateAbsence: Date
    ) {}
  }