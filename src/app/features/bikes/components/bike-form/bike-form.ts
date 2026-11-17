import { Component, inject, signal, input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateBikeDto } from '../../models/bike.model';
import { Router, RouterLink } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../shared/validators/not-blank.validators';
import { wrongValue } from '../../../../shared/validators/wrong-value.validators';
import { imageUrlValidator } from '../../../../shared/validators/image-valid.validator';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bike-form',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule,
     MatInputModule, MatCardModule, MatProgressBar, MatProgressBarModule, MatSelectModule],
  templateUrl: './bike-form.html',
  styleUrl: './bike-form.scss',
})
export class BikeForm implements OnInit {
  readonly id = input<string>();  // note this is optional by default
  private formBuilder = inject(FormBuilder);
  private bikeService = inject(BikeService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  saving = signal(false);
  saveError = signal<string | null>(null);

  
bikeForm = this.formBuilder.nonNullable.group({
  bikeName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), notBlank, wrongValue('test')]],
  type: ['', [Validators.required, Validators.maxLength(30), notBlank]],
  pricePerHour: [0, [Validators.min(1)]], 
  pricePerDay: [0, [Validators.min(1)]],
  description: [''],
  image: ['', [imageUrlValidator]], //string for url
  colour: [''],
  brand: [''],
});

onSubmit(): void {
  const { bikeName, type, pricePerHour, pricePerDay, description, image, colour, brand } = this.bikeForm.getRawValue();
  const newBike: CreateBikeDto = { bikeName, type, pricePerHour, pricePerDay, description : description,
    image: image, colour: colour, brand: brand ?? undefined };
  const id = this.id();
  const request = id ? this.bikeService.updateBike(id, newBike) : this.bikeService.addBike(newBike);
  this.saving.set(true);
  this.saveError.set(null);
  request.subscribe({
    next: (response) => {
      this.snackBar.open(`${newBike.bikeName} saved`, 'Close', { duration: 10000 });
      console.log('Bike added successfully:', response);
      this.router.navigate(['/bikes']);
    },
    error: (err: Error) => {
      this.saveError.set(err.message);
      this.saving.set(false);
    }
  });
}
ngOnInit(): void {
  const id = this.id();
  if (!id) return; // adding a new bike, nothing to load

  this.bikeService.getBikebyId(id).subscribe({
    next: (bike) =>
      this.bikeForm.patchValue({ bikeName: bike.bikeName, type: bike.type, pricePerHour: bike.pricePerHour ?? 0,
         pricePerDay: bike.pricePerDay ?? 0, description: bike.description ?? '',
         image: bike.image ?? '', colour: bike.colour ?? '', brand: bike.brand ?? '' }),
    error: (err: Error) => this.saveError.set(err.message),
  });
}
colours = [
  'red', 'blue', 'green', 'yellow', 'orange',
  'black', 'white', 'grey', 'silver', 'purple',
  'pink', 'brown', 'gold'];

brands = [
  'Trek', 'Giant', 'Specialized', 'Cannondale',
  'Scott', 'Cube', 'Merida', 'Bianchi',
  'Canyon', 'Orbea', 'Santa Cruz', 'Raleigh',
  'Brompton', 'GT', 'Norco'];
  //arrays of option for dropdown boxes
}