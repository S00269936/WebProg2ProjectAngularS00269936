import { Routes } from '@angular/router';
import { BikeList } from './features/bikes/pages/bike-list/bike-list';
import { BikeDetails } from './features/bikes/components/bike-details/bike-details';
import { BikeForm } from './features/bikes/components/bike-form/bike-form';

export const routes: Routes = [
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
        path: 'bikes/:id',
        component: BikeDetails
    },
    {
        path: 'bikes/new',
        component: BikeForm
    }
];
