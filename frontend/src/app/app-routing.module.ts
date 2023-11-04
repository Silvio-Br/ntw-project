import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './professor/students/students.component';
import { AbsenceComponent } from './professor/absence/absence.component';
import { AbsenceListComponent } from './professor/absence-list/absence-list.component';
import { SendMessageComponent } from './shared/message/send-message/send-message.component';
import {LoginComponent} from "./shared/login/login.component";
import {ProfilComponent} from "./shared/profil/profil.component";
import {MyAbsencesComponent} from "./student/my-absences/my-absences.component";
import {AddUserComponent} from "./admin/add-user/add-user.component";
import {ListProfessorsComponent} from "./admin/list-professors/list-professors.component";
import {ListStudentsComponent} from "./admin/list-students/list-students.component";
import { ProfessorsComponent } from './student/professors/professors.component';
import {AuthGuard} from "./shared/guards/auth.guard";
import {StudentGuard} from "./shared/guards/student.guard";
import {ProfessorGuard} from "./shared/guards/professor.guard";
import {AdminGuard} from "./shared/guards/admin.guard";
import {UnAuthGuard} from "./shared/guards/un-auth.guard";

const routes: Routes = [
  // Common routes
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard]},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'sendMessage/:email', component: SendMessageComponent, canActivate: [AuthGuard] },

  // Student routes
  { path: 'student/my-absences', component: MyAbsencesComponent, canActivate: [AuthGuard, StudentGuard] },
  { path: 'student/professors', component: ProfessorsComponent, canActivate: [AuthGuard, StudentGuard] },

  // Professor routes
  { path: 'professor/students', component: StudentsComponent, canActivate: [AuthGuard, ProfessorGuard] }, // students component
  { path: 'professor/absences', component: AbsenceListComponent, canActivate: [AuthGuard, ProfessorGuard]},
  { path: 'professor/absences/:studentId', component: AbsenceComponent, canActivate: [AuthGuard, ProfessorGuard] },

  // Admin routes
  { path: 'admin/add-user', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/professors', component: ListProfessorsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/students', component: ListStudentsComponent, canActivate: [AuthGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
