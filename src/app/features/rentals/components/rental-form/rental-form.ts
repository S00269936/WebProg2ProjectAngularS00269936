import { Component, inject, signal, input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateRentalDto } from '../../models/rental.model';
import { Router, RouterLink } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../shared/validators/not-blank.validators';
import { wrongValue } from '../../../../shared/validators/wrong-value.validators';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Loading BikeID's for adding rentals
import { BikeService } from '../../../bikes/services/bike.service';
import { Bike } from '../../../bikes/models/bike.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-rental-form',
  imports: [RouterLink, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './rental-form.html',
  styleUrl: './rental-form.scss',
})
export class RentalForm implements OnInit {
  readonly id = input<string>();  // note this is optional by default
  private formBuilder = inject(FormBuilder);
  private rentalService = inject(RentalService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  saving = signal(false);
  saveError = signal<string | null>(null);
  //for bike ids
  private bikeService = inject(BikeService);
  bikes = signal<Bike[]>([]);

  
rentalForm = this.formBuilder.nonNullable.group({
  bike: ['', [Validators.required]],
  bikeName: ['', [Validators.required, notBlank, wrongValue('test')]],
  customerName: ['', [Validators.required, Validators.maxLength(30), notBlank]],
  contactPhone: ['', [Validators.required, notBlank]],
  startDate: ['', [Validators.required]],
  endDate: ['', [Validators.required]],
  totalPrice: [0, [Validators.required, Validators.min(1)]],
  status: [true, [Validators.required]],
  customerNotes: ['']
});

onSubmit(): void {
    const { bike, bikeName, customerName, contactPhone, startDate, endDate, totalPrice, status, customerNotes } = this.rentalForm.getRawValue();
    const newRental: CreateRentalDto = { bike, bikeName, customerName, contactPhone, startDate, endDate, totalPrice, status, customerNotes : customerNotes ?? undefined };
    const id = this.id();
    const request = id ? this.rentalService.updateRental(id, newRental) : this.rentalService.addRental(newRental);
    this.saving.set(true);
    this.saveError.set(null);
    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newRental.bikeName} rental saved`, 'Close', { duration: 10000 });
        console.log('Rental added successfully:', response);
        this.router.navigate(['/rentals']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      }
    });
}
ngOnInit(): void {
  this.bikeService.getBikes().subscribe({
    next: (bikes) => this.bikes.set(bikes),
    error: (err: Error) => this.saveError.set(err.message)
  }); //get all bikes for id dropdown
  const id = this.id();
  if (!id) return;
  this.rentalService.getRentalById(id).subscribe({
    next: (rental) =>
      this.rentalForm.patchValue({ bike: rental.bike, bikeName: rental.bikeName, customerName: rental.customerName, contactPhone: rental.contactPhone, startDate: rental.startDate, endDate: rental.endDate, totalPrice: rental.totalPrice, status: rental.status, customerNotes: rental.customerNotes ?? '' }),
    error: (err: Error) => {
      this.saveError.set(err.message);
    }
  });
}

onBikeChange(id: string): void {
  const bike = this.bikes().find(b => b._id === id);

  if (bike) {
    this.rentalForm.patchValue({
      bike: bike._id,
      bikeName: bike.bikeName
    });
    this.calculateTotalPrice();
  }
} //loads bike name to the dropdown when the bike id is selected

calculateTotalPrice(): void {
  const { bike, startDate, endDate } = this.rentalForm.getRawValue();
  const selectedBike = this.bikes().find(b => b._id === bike);
  if (!selectedBike || !startDate || !endDate) return;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const total = Math.max(1, days) * (selectedBike.pricePerDay ?? 0);
  this.rentalForm.patchValue({ totalPrice: total });
}
}
