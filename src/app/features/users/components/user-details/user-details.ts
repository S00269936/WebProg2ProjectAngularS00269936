import { Component, input, inject, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink, MatAnchor],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  private router = inject(Router);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();
  private userService = inject(UserService);
  readonly user = signal<User | null>(null);
  readonly initial: LoadState<User> = {status: 'loading'};

  state = toSignal(toObservable(this.id).pipe(switchMap((id) => withLoadState(this.userService.getUserById(id))),
), {initialValue: this.initial});

ngOnInit(): void {
  this.userService.getUserById(this.id()).subscribe((user) => {
    this.user.set(user);
  });

}
deleteUser(user: User): void {
  if (!user._id) return;
  if (!confirm(`Delete ${user.name}?`)) return;

  this.deleting.set(true);
  this.deleteError.set(null);

  this.userService.deleteUser(user._id).subscribe({
    next: () => this.router.navigate(['/users']),
    error: (err: Error) => {
      this.deleteError.set(err.message);
      this.deleting.set(false);
    },
  });
}

}
