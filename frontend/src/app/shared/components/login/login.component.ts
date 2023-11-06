import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly _form: FormGroup;
  private _failedLogin: boolean = false;
  private mail: string = '';

  setEmail(email: string) {
    this.mail = email;
  }

  getEmail(): string {
    return this.mail;
  }
  constructor(private readonly _authService: AuthService, private readonly _router: Router) {
    this._form = this._buildForm();
  }

  ngOnInit(): void {
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  get failedLogin(): boolean {
    return this._failedLogin;
  }

  submit(form: any): void {
    this._authService.login(form.email, form.password).subscribe(
      () => {
        this._failedLogin = false;
        this.setEmail(form.email)
        let role = this._authService.user.role;
        if (role === 'student') {
          this._router.navigate(['/student/my-absences']);
        } else if (role === 'professor') {
          this._router.navigate(['/professor/students']);
        } else if (role === 'admin') {
          this._router.navigate(['/admin/students']);
        }
      },
      () => {
        this._failedLogin = true;
      }
    );
  }


}
