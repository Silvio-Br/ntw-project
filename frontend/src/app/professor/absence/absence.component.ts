import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Absence} from './../../shared/types/absence.type';
import {AuthService} from '../../shared/services/auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/validators/custom-validators";

@Component({
    selector: 'app-absence',
    templateUrl: './absence.component.html',
    styleUrls: ['./absence.component.css']
})
export class AbsenceComponent {

    private _success = false;
    private _form: FormGroup;
    private _model: Absence = {} as Absence;

    showAlert = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private _auth: AuthService) {
        this._success = false;
        this.route.paramMap.subscribe(params => {
            const studentIdString = params.get('studentId');

            // Check if studentIdString is not null
            if (studentIdString !== null) {
                // Set the value of etudiantId in the absence object
                this._model.etudiantId = studentIdString;
                this._model.enseignantId = this._auth.id
                this._model.etat = 'justified';
            }
        });
        this._form = this._buildForm();
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            enseignantId: new FormControl(
                this._model.enseignantId,
                Validators.compose([Validators.required])
            ),
            etudiantId: new FormControl(
                this._model.etudiantId,
                Validators.compose([Validators.required])
            ),
            etat: new FormControl(this._model.etat, [
                Validators.required,
                CustomValidators.etatAbsence
            ]),
            dateAbsence: new FormControl(this._model.dateAbsence, Validators.compose([
                Validators.required,
            ])),
            dateAbsenceto: new FormControl(this._model.dateAbsenceto, Validators.compose([
                Validators.required,
            ])),
            matiere: new FormControl(this._model.matiere, Validators.compose([
                Validators.required,
            ])),
        });
    }

    get success() {
        return this._success;
    }

    get form(): FormGroup {
        return this._form;
    }

    onSubmit() {
        this.showAlert = false;
        this._success = false;
        this._model = this.form.value;
        if (this._model.dateAbsence && this._model.dateAbsence) {
            const dateFrom = new Date(this._model.dateAbsence);
            const dateTo = new Date(this._model.dateAbsenceto);
            if (dateFrom >= dateTo) {
                this.showAlert = true;
            }else {
                this.http.post('http://localhost:3000/absences', this._model)
                    .subscribe(
                        (response) => {
                            console.log('Absence created successfully:', response);
                            this._success = true;
                            // Handle success, e.g., navigate to a success page or reset the form
                        },
                        (error) => {
                            console.error('Error creating absence:', error);
                            // Handle errors, e.g., display an error message to the user
                        }
                    );
            }
        }
    }

}
