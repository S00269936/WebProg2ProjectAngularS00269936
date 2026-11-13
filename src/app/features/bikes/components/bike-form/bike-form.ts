import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateBikeDto } from '../../models/bike.model';
import { Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-bike-form',
  imports: [ReactiveFormsModule],
  templateUrl: './bike-form.html',
  styleUrl: './bike-form.scss',
})
export class BikeForm {
  private formBuilder = inject(FormBuilder);
  private bikeService = inject(BikeService);
  private router = inject(Router);

  bikeForm = this.formBuilder.nonNullable.group({
    bikeName: ['', Validators.required],
    type: ['', Validators.required],
    pricePerHour: [0],
    pricePerDay: [0],
    description: ['']
    //add more fields later
    
  });

  onSubmit(): void {
    const { bikeName, type, pricePerHour, pricePerDay, description } = this.bikeForm.getRawValue();
    const newBike: CreateBikeDto = { bikeName, type, pricePerHour, pricePerDay, description };
    console.log('Submitted Bike:', newBike);
    this.bikeService.addBike(newBike).subscribe({
      next: (response) => {
        console.log('Bike added successfully:', response);
        this.router.navigate(['/bikes']);
      },
      error: (error) => {
        console.error('Error adding bike:', error);
      }
    });
  }
}