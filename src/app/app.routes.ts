import { Routes } from '@angular/router';
import { BikeList } from './features/bikes/pages/bike-list/bike-list';
import { BikeDetails } from './features/bikes/components/bike-details/bike-details';
import { BikeForm } from './features/bikes/components/bike-form/bike-form';
import { RentalList } from './features/rentals/pages/rental-list/rental-list';
import { RentalDetails } from './features/rentals/components/rental-details/rental-details';
import { RentalForm } from './features/rentals/components/rental-form/rental-form';

export const routes: Routes = [
    //Bikes
    {
        path: '',
        redirectTo: 'bikes',
        pathMatch: 'full'
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
    }
];
