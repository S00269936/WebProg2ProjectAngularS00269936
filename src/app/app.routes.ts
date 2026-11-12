import { Routes } from '@angular/router';
import { BikeList } from './features/bikes/pages/bike-list/bike-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'bikes',
        pathMatch: 'full'
    },
    {
        path: 'bikes',
        component: BikeList
    }
];
