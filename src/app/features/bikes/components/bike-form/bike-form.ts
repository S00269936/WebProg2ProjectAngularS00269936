import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Bike } from '../../models/bike.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bike-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './bike-form.html',
  styleUrl: './bike-form.scss',
})
export class BikeForm {
  private formBuilder = inject(FormBuilder);

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
      
  }

}
