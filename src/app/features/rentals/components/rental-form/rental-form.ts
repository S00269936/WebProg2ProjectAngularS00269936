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

@Component({
  selector: 'app-rental-form',
  imports: [RouterLink, MatCheckboxModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule],
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
}
