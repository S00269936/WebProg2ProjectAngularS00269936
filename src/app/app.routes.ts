import { Routes } from '@angular/router';
import { BikeList } from './features/bikes/pages/bike-list/bike-list';
import { BikeDetails } from './features/bikes/components/bike-details/bike-details';
import { BikeForm } from './features/bikes/components/bike-form/bike-form';
import { RentalList } from './features/rentals/pages/rental-list/rental-list';
import { RentalDetails } from './features/rentals/components/rental-details/rental-details';
import { RentalForm } from './features/rentals/components/rental-form/rental-form';
import { UserList } from './features/users/pages/user-list/user-list';
import { UserForm } from './features/users/components/user-form/user-form';
import { UserDetails } from './features/users/components/user-details/user-details';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
    //Bikes
    {
        path: '',
        component: Home
    },
    {
        path: 'bikes',
        component: BikeList
    },
    {
        path: 'bikes/new',
        component: BikeForm
    },
    {
        path: 'bikes/:id/edit',
        component: BikeForm
    },
    {
        path: 'bikes/:id',
        component: BikeDetails
    },
    //Rentals
    {
        path: 'rentals',
        component: RentalList
    },
    {
        path: 'rentals/new',
        component: RentalForm
    },
    {
        path: 'rentals/:id',
        component: RentalDetails
    },
    {
        path: 'rentals/:id/edit',
        component: RentalForm
    },
    //Users

{
    path: 'users',
    component: UserList
  },
  {
    path: 'users/new',
    component: UserForm
  },
  {
    path: 'users/:id',
    component: UserDetails
  },
  {
    path: 'users/:id/edit',
    component: UserForm
  }
  
];
