export type Absence = {
    _id: string;
    enseignantId: String;
    etudiantId: string;
    etat: string;
    dateAbsence: Date;
    matiere: string;
    dateAbsenceto: string; // Add dat
};
