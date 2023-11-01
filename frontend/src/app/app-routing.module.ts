import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { AbsenceComponent } from './absence/absence.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {UnAuthGuard} from "./shared/guards/un-auth.guard";
import {ProfilComponent} from "./profil/profil.component";
import {MyAbsencesComponent} from "./my-absences/my-absences.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to the home page
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard]},
  { path: 'students', component: StudentsComponent }, // students component
  { path: 'absence/:studentId', component: AbsenceComponent },
  { path: 'profil', component: ProfilComponent},
  { path: 'my-absences', component: MyAbsencesComponent, canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
