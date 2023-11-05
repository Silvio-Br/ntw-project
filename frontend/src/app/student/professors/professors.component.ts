// professors.component.ts

import { Component, OnInit } from '@angular/core';
import { ProfessorService } from './professors.service';
import {User} from "../../shared/types/user.type";


@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
})
export class ProfessorsComponent implements OnInit {
  private _professors: User[] = [];
  private _nbPages: number = 1;
  private _pagesArray: number[] = [];
  private _currentPage: number = 1;
  private _currentProfessors: User[] = [];

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.professorService.getAllProfessors().subscribe((data) => {
      this._professors = data;
      this._currentProfessors = this._professors.slice(0, 10);
      this._nbPages = Math.ceil(this._professors.length / 10);
      this._pagesArray = Array(this._nbPages).fill(0).map((x, i) => i + 1);
    });
  }

  get pages(): number[] {
    return this._pagesArray;
  }

  get professors(): User[] {
    return this._currentProfessors;
  }

  changePage(page: number) {
    this._currentPage = page;
    this._currentProfessors = this._professors.slice((page - 1) * 10, page * 10);
  }
}
