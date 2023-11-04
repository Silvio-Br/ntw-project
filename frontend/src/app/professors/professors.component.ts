// professors.component.ts

import { Component, OnInit } from '@angular/core';
import { ProfessorService } from './professors.service';


@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
})
export class ProfessorsComponent implements OnInit {
  students: any[] = [];

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.professorService.getAllProfessors().subscribe((data) => {
      this.students = data;
    });
  }
}
