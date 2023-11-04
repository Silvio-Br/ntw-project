import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Absence } from './absence.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent {


  constructor(private route: ActivatedRoute, private http: HttpClient, private aut:AuthService) {
  this.route.paramMap.subscribe(params => {
    const studentIdString = params.get('studentId');

    // Check if studentIdString is not null
    if (studentIdString !== null) {
      // Set the value of etudiantId in the absence object
      this.absence.etudiantId = studentIdString;
      this.absence.enseignantId=this.aut.id
    }
  });
}

  absence: Absence = new Absence(); // Initialize your absence object with default values
  showAlert = false;


  onSubmit() {
    // Make an HTTP POST request to your NestJS backend
    if (this.absence.dateAbsence && this.absence.dateAbsenceto) {
    const dateFrom = new Date(this.absence.dateAbsence);
    const dateTo = new Date(this.absence.dateAbsenceto);
    if (dateFrom >= dateTo) {
      this.showAlert = true;
      }else{
        this.showAlert = false;
        this.http.post('http://localhost:3000/absences', this.absence)
      .subscribe(
        (response) => {
          console.log('Absence created successfully:', response);
          // Handle success, e.g., navigate to a success page or reset the form
        },
        (error) => {
          console.error('Error creating absence:', error);
          // Handle errors, e.g., display an error message to the user
        }
      );
  }}}

}
