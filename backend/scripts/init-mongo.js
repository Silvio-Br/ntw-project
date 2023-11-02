print("Start #################################################################");

db = db.getSiblingDB("nwt");

var existingUser = db.users.findOne({ role: "admin" });

// Si aucun utilisateur n'existe, insérez un nouvel utilisateur
if (!existingUser) {
    db.users.insertOne({
        firstname: "Admin",
        lastname: "Admin",
        phone: "+33612345678",
        email: "admin@admin.com",
        role: "admin",
        password: "password",
    });
}

// create 20 professors (with random data in users collection)
for (let i = 0; i < 20; i++) {
    db.users.insertOne({
        firstname: "Professor" + i,
        lastname: "Professor" + i,
        phone: "+33612345678",
        email: "professor" + i + "@professor.com",
        role: "professor",
        password: "password",
    });
}

// create 20 students (with random data in users collection)
for (let i = 0; i < 20; i++) {
    db.users.insertOne({
        firstname: "Student" + i,
        lastname: "Student"+ i,
        phone: "+33612345678",
        email: "student" + i + "@student.com",
        role: "student",
        password: "password",
    });
}

print("End #################################################################");
