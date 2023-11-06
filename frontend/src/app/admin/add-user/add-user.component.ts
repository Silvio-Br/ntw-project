import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../shared/types/user.type";
import {ProfessorsService} from "../../shared/services/professors.service";
import {StudentsService} from "../../shared/services/students.service";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

    private _alreadyExist: boolean;
    private _userType: string;

    constructor(private readonly _professorsService: ProfessorsService,
                private readonly _studentsService: StudentsService,
                private readonly _router: Router) {
        this._alreadyExist = false;
        this._userType = 'student';
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

    submit(form: User) {
        form.password = 'password';
        if (this._userType === 'student') {
            this._studentsService.create(form).subscribe((response: any) => {
                this._router.navigate([`/admin/${this._userType}s`]);
            }, (error) => {
                this._alreadyExist = true;
            });
        } else {
            this._professorsService.create(form).subscribe((response: any) => {
                this._router.navigate([`/admin/${this._userType}s`]);
            }, (error) => {
                this._alreadyExist = true;
            });
        }
    }

}
