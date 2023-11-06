import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    /**
     * Function to control email with custom validator
     */
    static etatAbsence(control: AbstractControl): ValidationErrors | null {
        return control.value === 'justified' || control.value === 'unjustified' || control.value === 'waiting'
            ? null
            : {
                etatAbsence: true,
            };
    }

    static dateRangeValidator(dates: any[]): ValidationErrors | null {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const selectedDate = new Date(control.value);
            for (const date of dates) {
                if (selectedDate >= date.startDate && selectedDate <= date.endDate) {
                    return { 'dateOverlap': true };
                }
            }
            return null;
        };
    }
}
