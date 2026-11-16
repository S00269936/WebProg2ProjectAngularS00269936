import { Component, inject, signal, input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateUserDto } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../shared/validators/not-blank.validators';
import { wrongValue } from '../../../../shared/validators/wrong-value.validators';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-user-form',
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatCardModule, 
    MatProgressBarModule, MatSelectModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {
  readonly id = input<string>();  // note this is optional by default
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  saving = signal(false);
  saveError = signal<string | null>(null);
  userRole = signal<'customer' | 'staff'>('customer');


userForm = this.formBuilder.nonNullable.group({
  name: ['', [Validators.required, Validators.maxLength(30), notBlank, wrongValue('test')]],
  email: ['', [Validators.required, Validators.email, notBlank]],
  password: ['', [Validators.required, Validators.minLength(6), notBlank]],
  role: ['customer' as 'customer' | 'staff', [Validators.required]]
});

onSubmit(): void {
    if (this.userForm.invalid || this.saving()) return;
    const { name, email, password, role } = this.userForm.getRawValue();
    const newUser: CreateUserDto = { name, email, password, role };
    const id = this.id();
    const request = id ? this.userService.updateUser(id, { name, email }) : this.userService.addUser(newUser);
    this.saving.set(true);
    this.saveError.set(null);
    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newUser.name} user saved`, 'Close', { duration: 10000 });
        console.log('User added successfully:', response);
        this.router.navigate(['/users']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      }
    });
  }

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.userForm.controls.password.clearValidators();
      this.userForm.controls.password.updateValueAndValidity();
      //remove password field from the form when editing a user
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.userForm.patchValue({name: user.name, email: user.email});
          this.userRole.set(user.role); //sets role of user when editing to differ
        },
        error: (err: Error) => {
          this.saveError.set(err.message);
        }
      });
    }
  }

}
