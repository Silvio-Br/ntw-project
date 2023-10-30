import { Component, OnInit } from '@angular/core';
import { StudentService } from './students.service';
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
  createAbsence(student: any) {
    // Logic to create a new absence for the selected student
  }

  sendMessage(student: any) {
    // Logic to send a message to the selected student
  }
}
