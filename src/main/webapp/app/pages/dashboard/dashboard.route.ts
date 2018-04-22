import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';

import { ChartComponent } from './chart.component';
import { InteractiveComponent } from './interactive.component';

export const DashboardRoute: Routes = [
    {
        path: 'dashboard-chart',
        component: ChartComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dashboard-interactive',
        component: InteractiveComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Interactives'
        },
        canActivate: [UserRouteAccessService]
    },
];
