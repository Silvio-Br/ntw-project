import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { AbsenceComponent } from './absence/absence.component';
<<<<<<< HEAD
import { AbsenceListComponent } from './absence-list/absence-list.component';
import { SendMessageComponent } from './send-message/send-message.component';

const routes: Routes = [
  // Redirect to the home page
  { path: 'students', component: StudentsComponent }, // students component
  { path: 'absence/:studentId', component: AbsenceComponent },
  { path: 'absence', component: AbsenceListComponent },
  { path: 'sendMessage/:email', component: SendMessageComponent },
  
=======
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./shared/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {UnAuthGuard} from "./shared/guards/un-auth.guard";
import {ProfilComponent} from "./shared/profil/profil.component";
import {MyAbsencesComponent} from "./student/my-absences/my-absences.component";
import {AddUserComponent} from "./admin/add-user/add-user.component";
import {ListProfessorsComponent} from "./admin/list-professors/list-professors.component";
import {ListStudentsComponent} from "./admin/list-students/list-students.component";
import {AdminGuard} from "./shared/guards/admin.guard";
import {ProfessorGuard} from "./shared/guards/professor.guard";
import {StudentGuard} from "./shared/guards/student.guard";

const routes: Routes = [
  // Common route
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to the home page
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard]},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard, ProfessorGuard, StudentGuard]},
>>>>>>> b2d86b2c5d8448a21aaf37533d2836c2ec408955

  // Student routes
  { path: 'student/my-absences', component: MyAbsencesComponent, canActivate: [AuthGuard, StudentGuard] },

  // Professor routes
  { path: 'professor/students', component: StudentsComponent, canActivate: [AuthGuard, ProfessorGuard] }, // students component
  { path: 'absence/:studentId', component: AbsenceComponent, canActivate: [AuthGuard, ProfessorGuard] },

  // Admin routes
  { path: 'admin/add-user', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/professors', component: ListProfessorsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/students', component: ListStudentsComponent, canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
