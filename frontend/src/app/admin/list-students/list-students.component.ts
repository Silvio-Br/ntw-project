import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/types/user.type";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  private _students: User[] = [];

  constructor(private readonly _apiService: ApiService) {
  }

  get students(): User[] {
    return this._students;
  }

  ngOnInit(): void {
    this._apiService.getStudents().subscribe((response: any) => {
      this._students = response;
    });
  }

  onDelete(_id: String) {
    this._apiService.deleteUser(_id, 'student').subscribe((response: any) => {
      this._students = this._students.filter((student: User) => student._id !== _id);
    });
  }
}
