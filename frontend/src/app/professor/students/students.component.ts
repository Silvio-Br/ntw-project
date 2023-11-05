import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../shared/services/students.service';
import { Student } from './student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
    });


  }

}
