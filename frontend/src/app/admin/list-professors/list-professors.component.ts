import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/types/user.type";
import {ProfessorsService} from "../../shared/services/professors.service";

@Component({
  selector: 'app-list-professors',
  templateUrl: './list-professors.component.html',
  styleUrls: ['./list-professors.component.css']
})
export class ListProfessorsComponent implements OnInit {

  private _professors: User[] = [];

  constructor(private readonly _professorsService: ProfessorsService) {
  }

  get professors(): User[] {
    return this._professors;
  }

  ngOnInit(): void {
    this._professorsService.findAll().subscribe((response: any) => {
      this._professors = response;
    });
  }

  onDelete($event: String) {
    this._professorsService.delete($event).subscribe((response: any) => {
      this._professors = this._professors.filter((professor: User) => professor._id !== $event);
    });
  }
}
