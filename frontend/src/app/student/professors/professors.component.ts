// professors.component.ts

import { Component, OnInit } from '@angular/core';

import {User} from "../../shared/types/user.type";
import {ProfessorsService} from "../../shared/services/professors.service";


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
  searchName: string = '';

  constructor(private _professorsService: ProfessorsService) {}

  ngOnInit(): void {
    this._professorsService.findAll().subscribe((data) => {
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

  filterProfessors() {
    if (this.searchName.trim() === '') {
      this._currentProfessors = this._professors.slice(0, 10);
      this._currentPage = 1;
    } else {
      // Filter absences based on the searchDate
      if (this._professors != undefined)
        this._currentProfessors = this._professors.filter((professor) => {
          const name = professor.firstname + " " + professor.lastname;
          return name.toLowerCase().includes(this.searchName.toLowerCase());
        });
    }
  }

  get nbPages(): number {
    return this._nbPages;
  }

  changePage(page: number) {
    this._currentPage = page;
    this._currentProfessors = this._professors.slice((page - 1) * 10, page * 10);
  }
}
