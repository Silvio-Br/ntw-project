import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/types/user.type";
import {StudentsService} from "../../shared/services/students.service";

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  private _students: User[] = [];

  constructor(private readonly _studentsService: StudentsService) {
  }

  get students(): User[] {
    return this._students;
  }

  ngOnInit(): void {
    this._studentsService.findAll().subscribe((response: any) => {
      this._students = response;
    });
  }

  onDelete(_id: String) {
    this._studentsService.delete(_id).subscribe((response: any) => {
      this._students = this._students.filter((student: User) => student._id !== _id);
    });
  }
}
