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

const people = [
    { firstname: 'John', lastname: 'Doe' },
    { firstname: 'Alice', lastname: 'Smith' },
    { firstname: 'Bob', lastname: 'Johnson' },
    { firstname: 'Emily', lastname: 'Brown' },
    { firstname: 'Michael', lastname: 'Wilson' },
    { firstname: 'Olivia', lastname: 'Lee' },
    { firstname: 'James', lastname: 'Taylor' },
    { firstname: 'Sophia', lastname: 'Anderson' },
    { firstname: 'William', lastname: 'Martinez' },
    { firstname: 'Mia', lastname: 'Harris' },
    { firstname: 'David', lastname: 'Clark' },
    { firstname: 'Emma', lastname: 'Lopez' },
    { firstname: 'Joseph', lastname: 'Hall' },
    { firstname: 'Ava', lastname: 'Young' },
    { firstname: 'Christopher', lastname: 'Garcia' },
    { firstname: 'Abigail', lastname: 'Moore' },
    { firstname: 'Robert', lastname: 'Turner' },
    { firstname: 'Sofia', lastname: 'Lewis' },
    { firstname: 'Daniel', lastname: 'King' },
    { firstname: 'Ella', lastname: 'White' },
    { firstname: 'Matthew', lastname: 'Walker' },
    { firstname: 'Grace', lastname: 'Scott' },
    { firstname: 'Andrew', lastname: 'Perez' },
    { firstname: 'Lily', lastname: 'Davis' },
    { firstname: 'Nicholas', lastname: 'Gonzalez' },
    { firstname: 'Chloe', lastname: 'Hernandez' },
    { firstname: 'Ethan', lastname: 'Adams' },
    { firstname: 'Madison', lastname: 'Baker' },
    { firstname: 'Aiden', lastname: 'Hill' },
    { firstname: 'Scarlett', lastname: 'Cook' },
    { firstname: 'Mason', lastname: 'Bell' },
    { firstname: 'Hannah', lastname: 'Price' },
    { firstname: 'Benjamin', lastname: 'Carter' },
    { firstname: 'Avery', lastname: 'Ward' },
    { firstname: 'Joshua', lastname: 'Murphy' },
    { firstname: 'Nora', lastname: 'Foster' },
    { firstname: 'Caleb', lastname: 'Russell' },
    { firstname: 'Victoria', lastname: 'Perry' },
    { firstname: 'Wyatt', lastname: 'Reed' },
    { firstname: 'Zoe', lastname: 'Alexander' },
    { firstname: 'Elijah', lastname: 'Gray' },
];

// Crée 20 professeurs s'il n'y en a pas déjà
var existingProfessors = db.users.countDocuments({ role: "professor" });
if (existingProfessors === 0) {
    for (let i = 0; i < 20; i++) {
        // Génère un nom et un prénom aléatoires
        var firstName = people[i].firstname;
        var lastName = people[i].lastname;

        db.users.insertOne({
            firstname: firstName,
            lastname: lastName,
            phone: "+33612345678",
            email: people[i].firstname.toLowerCase() + '.' + people[i].lastname.toLowerCase() + "@professor.com",
            role: "professor",
            password: "$2b$10$imnwXBjXRwbSwr9chXTPAu/NHi4Q4OPDtCuOUyYvaEvD9.ZRac5p.",
        });
    }
}

// Crée 20 étudiants s'il n'y en a pas déjà
var existingStudents = db.users.countDocuments({ role: "student" });
if (existingStudents === 0) {
    for (let i = 20; i < 40; i++) {
        // Génère un nom et un prénom aléatoires
        var firstName = people[i].firstname;
        var lastName = people[i].lastname;

        db.users.insertOne({
            firstname: firstName,
            lastname: lastName,
            phone: "+33612345678",
            email: people[i].firstname.toLowerCase() + '.' + people[i].lastname.toLowerCase() + "@student.com",
            role: "student",
            password: "$2b$10$imnwXBjXRwbSwr9chXTPAu/NHi4Q4OPDtCuOUyYvaEvD9.ZRac5p.",
        });
    }
}

print("End #################################################################");
