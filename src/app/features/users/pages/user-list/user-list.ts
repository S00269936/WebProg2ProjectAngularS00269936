import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state.js';
import { UserCard } from '../../components/user-card/user-card';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  imports: [UserCard, RouterLink, MatAnchor],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private userService = inject(UserService);
  users = toSignal(this.userService.getUsers());
  state = toSignal(withLoadState(this.userService.getUsers()), { requireSync: true });
}
