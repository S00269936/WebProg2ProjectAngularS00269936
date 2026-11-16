import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state.js';
import { UserCard } from '../../components/user-card/user-card';

@Component({
  selector: 'app-user-list',
  imports: [UserCard],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private userService = inject(UserService);
  users = toSignal(this.userService.getUsers());
  state = toSignal(withLoadState(this.userService.getUsers()), { requireSync: true });
}
