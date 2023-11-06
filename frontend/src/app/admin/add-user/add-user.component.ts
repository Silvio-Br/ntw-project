import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../shared/types/user.type";
import {ProfessorsService} from "../../shared/services/professors.service";
import {StudentsService} from "../../shared/services/students.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

    private _form: FormGroup;
    private _alreadyExist: boolean;
    private _userType: string;
    private _model: User;

    constructor(private readonly _professorsService: ProfessorsService,
                private readonly _studentsService: StudentsService,
                private readonly _router: Router) {
        this._alreadyExist = false;
        this._userType = 'student';
        this._form = this._buildForm();
        this._model = {} as User;
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            firstname: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            lastname: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('(0|\\+33)\\d{9}'),
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
            ])),
        });
    }

    get alreadyExist(): boolean {
        return this._alreadyExist;
    }

    get userType(): string {
        return this._userType;
    }

    set userType(userType: string) {
        this._userType = userType;
    }

    get form(): FormGroup {
        return this._form;
    }

    onSubmit() {
        console.log(this._form.value)
        console.log('model', this._model)
        this._model = this._form.value;
        if (this._userType === 'student') {
            this._studentsService.create(this._model).subscribe((response: any) => {
                this._router.navigate([`/admin/${this._userType}s`]);
            }, (error) => {
                this._alreadyExist = true;
            });
        } else {
            this._professorsService.create(this._model).subscribe((response: any) => {
                this._router.navigate([`/admin/${this._userType}s`]);
            }, (error) => {
                this._alreadyExist = true;
            });
        }
    }

}
