import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../shared/services/students.service';
import { Student } from '../../shared/types/student.type';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  private _students: Student[] | undefined;

  constructor(private _studentsService: StudentsService) { }

  get students(): Student[] | undefined {
    return this._students;
  }

  ngOnInit() {
    this._studentsService.findAll().subscribe((data: Student[]) => {
      this._students = data;
    });


  }

}
