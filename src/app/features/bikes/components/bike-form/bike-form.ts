import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Bike } from '../../models/bike.model';
import { RouterLink, Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-bike-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './bike-form.html',
  styleUrl: './bike-form.scss',
})
export class BikeForm {
  private formBuilder = inject(FormBuilder);
  private bikeService = inject(BikeService);
  private router = inject(Router);

   bikeForm = this.formBuilder.group({
     bikeName: ['', Validators.required],
     type: ['', Validators.required],
     pricePerHour: [''],
     pricePerDay: [''],
     description: [''],
     //ADD FIELDS LATER
   });

   onSubmit(): void {
    const bikeData: Bike = this.bikeForm.value as Bike;
    console.log('Submitted Bike:', bikeData);
    this.router.navigate(['/bikes']);
    
    this.bikeService.addBike(bikeData).subscribe({
      next: (response) => {
        console.log('Bike added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding bike:', error);
      }
    });
  }
}