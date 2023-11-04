import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { AbsenceComponent } from './absence/absence.component';

import { AbsenceListComponent } from './absence-list/absence-list.component';
import { SendMessageComponent } from './send-message/send-message.component';
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
import { ProfessorsComponent } from './professors/professors.component';



  

const routes: Routes = [
  // Common route
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to the home page
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profil', component: ProfilComponent},


  // Student routes
  { path: 'student/my-absences', component: MyAbsencesComponent },

  // Professor routes
  { path: 'professor/students', component: StudentsComponent }, // students component
  { path: 'absence/:studentId', component: AbsenceComponent },

  // Admin routes
  { path: 'admin/add-user', component: AddUserComponent },
  { path: 'admin/professors', component: ListProfessorsComponent },
  { path: 'admin/students', component: ListStudentsComponent},
  { path: 'students', component: StudentsComponent}, // students component
 
  { path: 'absence', component: AbsenceListComponent},
  { path: 'sendMessage/:email', component: SendMessageComponent },
  { path: 'prof', component: ProfessorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
