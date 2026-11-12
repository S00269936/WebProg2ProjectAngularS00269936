import { Routes } from '@angular/router';
import { BikeList } from './features/bikes/pages/bike-list/bike-list';
import { BikeDetails } from './features/bikes/components/bike-details/bike-details';

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
    }
];
