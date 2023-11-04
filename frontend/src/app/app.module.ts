import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import { StudentsComponent } from './students/students.component';
import { HttpClientModule } from '@angular/common/http';
import { AbsenceComponent } from './absence/absence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbsenceListComponent } from './absence-list/absence-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageCardComponent } from './message-card/message-card.component';
import { SendMessageComponent } from './send-message/send-message.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './shared/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { ProfilComponent } from './shared/profil/profil.component';
import { StudentTableComponent } from './shared/components/table-absences/student-table.component';
import { MyAbsencesComponent } from './student/my-absences/my-absences.component';
import {FormComponent} from "./shared/components/form-user/form.component";
import { ListStudentsComponent } from './admin/list-students/list-students.component';
import { ListProfessorsComponent } from './admin/list-professors/list-professors.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { TableUsersComponent } from './shared/components/table-users/table-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfessorsComponent } from './professors/professors.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AbsenceComponent,

    AbsenceListComponent,
    MessageListComponent,
    MessageCardComponent,
    SendMessageComponent,
    HomeComponent,
    LoginComponent,
    ProfilComponent,
    StudentTableComponent,
    MyAbsencesComponent,
    FormComponent,
    ListStudentsComponent,
    ListProfessorsComponent,
    AddUserComponent,
    TableUsersComponent,
    ProfessorsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    NgxPaginationModule
  ],
  providers: [JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
