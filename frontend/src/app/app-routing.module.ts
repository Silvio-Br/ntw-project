import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { AbsenceComponent } from './absence/absence.component';
import { AbsenceListComponent } from './absence-list/absence-list.component';
import { SendMessageComponent } from './send-message/send-message.component';

const routes: Routes = [
  // Redirect to the home page
  { path: 'students', component: StudentsComponent }, // students component
  { path: 'absence/:studentId', component: AbsenceComponent },
  { path: 'absence', component: AbsenceListComponent },
  { path: 'sendMessage/:email', component: SendMessageComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
