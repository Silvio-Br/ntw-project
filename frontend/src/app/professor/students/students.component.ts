import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../shared/services/students.service';
import { Student } from '../../shared/types/student.type';
import {User} from "../../shared/types/user.type";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  private _students: Student[] = [];
  private _nbPages: number = 1;
  private _pagesArray: number[] = [];
  private _currentPage: number = 1;
  private _currentStudents: Student[] = [];
  searchName: string = '';

  constructor(private _studentsService: StudentsService) { }

  get students(): Student[] {
    return this._currentStudents;
  }

  ngOnInit() {
    this._studentsService.findAll().subscribe((data: Student[]) => {
      this._students = data;
      this._currentStudents = this._students.slice(0, 10);
      this._nbPages = Math.ceil(this._students.length / 10);
      this._pagesArray = Array(this._nbPages).fill(0).map((x, i) => i + 1);
    });
  }

  get nbPages(): number {
    return this._nbPages;
  }

  filterStudents() {
    if (this.searchName.trim() === '') {
      this._currentStudents = this._students.slice(0, 10);
      this._currentPage = 1;
    } else {
      // Filter absences based on the searchDate
      if (this._students != undefined)
        this._currentStudents = this._students.filter((student) => {
          const name = student.firstname + " " + student.lastname;
          return name.toLowerCase().includes(this.searchName.toLowerCase());
        });
    }
  }


  get pages(): number[] {
    return this._pagesArray;
  }

  changePage(page: number) {
    this._currentPage = page;
    this._currentStudents = this._students.slice((page - 1) * 10, page * 10);
  }

}
