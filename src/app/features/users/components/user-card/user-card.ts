import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, MatAnchor],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  user = input.required<User>();
}
