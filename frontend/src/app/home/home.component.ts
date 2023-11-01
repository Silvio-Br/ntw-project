import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {TOKEN_NAME} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private readonly apiService: ApiService, private readonly jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    // decode jwt token
    let token = localStorage.getItem(TOKEN_NAME);
    let decodedToken = this.jwtHelper.decodeToken(token!);
    console.log(decodedToken);
  }


}
