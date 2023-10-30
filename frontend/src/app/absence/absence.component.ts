import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Absence } from './absence.model';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent {
  
  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.route.paramMap.subscribe(params => {
      const studentIdString = params.get('studentId');
  
      // Convert the studentIdString to a number if needed
      console.log(studentIdString); // Assuming it's a base-10 integer
    });
  }

  absence: any = {}; // Create an object to store form data
  onSubmit() {
    const date = new Date(this.absence.datetimeAbsence);
  
    // Format the date as a string in the required format (yyyy-MM-ddThh:mm).
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
   const date1= formattedDate.toString();
    // Update the absence object with the formatted date.
    this.absence.datetimeAbsence =date1;
  
    this.http.post('http://localhost:3000/absences', this.absence).subscribe(
      (data) => {
        console.log('Absence registration successful:', data);
        // You can perform additional actions here, such as clearing the form or displaying a success message.
      },
      (error) => {
        console.error('Error registering absence:', error);
        // Handle error cases here.
      }
    );
  }
  
}