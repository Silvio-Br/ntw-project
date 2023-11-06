import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Absence} from './../../shared/types/absence.type';
import {AuthService} from '../../shared/services/auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/validators/custom-validators";
import {AbsencesService} from "../../shared/services/absences.service";

@Component({
    selector: 'app-absence',
    templateUrl: './absence.component.html',
    styleUrls: ['./absence.component.css']
})
export class AbsenceComponent {

    private _success = false;
    private _form: FormGroup;
    private _model: Absence = {} as Absence;
    private _showAlert = false;

    constructor(private _route: ActivatedRoute, private _authService: AuthService, private _absencesService: AbsencesService) {
        this._success = false;
        this._route.paramMap.subscribe(params => {
            const studentIdString = params.get('studentId');

            // Check if studentIdString is not null
            if (studentIdString !== null) {
                // Set the value of etudiantId in the absence object
                this._model.etudiantId = studentIdString;
                this._model.enseignantId = this._authService.id
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

    get showAlert() {
        return this._showAlert;
    }

    get form(): FormGroup {
        return this._form;
    }

    onSubmit() {
        this._showAlert = false;
        this._success = false;
        this._model = this.form.value;
        if (this._model.dateAbsence && this._model.dateAbsence) {
            const dateFrom = new Date(this._model.dateAbsence);
            const dateTo = new Date(this._model.dateAbsenceto);
            if (dateFrom >= dateTo) {
                this._showAlert = true;
            }else {
                this._absencesService.create(this._model).subscribe((response) => {
                    this._success = true;
                });
            }
        }
    }

}
