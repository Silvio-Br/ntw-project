print("Start #################################################################");

db = db.getSiblingDB("nwt");

var existingAdmin = db.users.findOne({ role: "admin" });

// Si aucun utilisateur admin n'existe, insérez un nouvel utilisateur admin
if (!existingAdmin) {
    db.users.insertOne({
        firstname: "Admin",
        lastname: "Admin",
        phone: "+33612345678",
        email: "admin@admin.com",
        role: "admin",
        password: "$2b$10$imnwXBjXRwbSwr9chXTPAu/NHi4Q4OPDtCuOUyYvaEvD9.ZRac5p.",
    });
}

// Crée 20 professeurs s'il n'y en a pas déjà
var existingProfessors = db.users.countDocuments({ role: "professor" });
if (existingProfessors === 0) {
    for (let i = 0; i < 20; i++) {
        // Génère un nom et un prénom aléatoires
        var firstName = "Professor" + i;
        var lastName = "Lastname" + i;

        db.users.insertOne({
            firstname: firstName,
            lastname: lastName,
            phone: "+33612345678",
            email: "professor" + i + "@professor.com",
            role: "professor",
            password: "$2b$10$imnwXBjXRwbSwr9chXTPAu/NHi4Q4OPDtCuOUyYvaEvD9.ZRac5p.",
        });
    }
}

// Crée 20 étudiants s'il n'y en a pas déjà
var existingStudents = db.users.countDocuments({ role: "student" });
if (existingStudents === 0) {
    for (let i = 0; i < 20; i++) {
        // Génère un nom et un prénom aléatoires
        var firstName = "Student" + i;
        var lastName = "Lastname" + i;

        db.users.insertOne({
            firstname: firstName,
            lastname: lastName,
            phone: "+33612345678",
            email: "student" + i + "@student.com",
            role: "student",
            password: "$2b$10$imnwXBjXRwbSwr9chXTPAu/NHi4Q4OPDtCuOUyYvaEvD9.ZRac5p.",
        });
    }
}

print("End #################################################################");
