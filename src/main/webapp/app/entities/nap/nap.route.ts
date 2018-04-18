import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NapComponent } from './nap.component';
import { NapDetailComponent } from './nap-detail.component';
import { NapPopupComponent } from './nap-dialog.component';
import { NapDeletePopupComponent } from './nap-delete-dialog.component';

export const napRoute: Routes = [
    {
        path: 'nap',
        component: NapComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nap/:id',
        component: NapDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const napPopupRoute: Routes = [
    {
        path: 'nap-new',
        component: NapPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nap/:id/edit',
        component: NapPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nap/:id/delete',
        component: NapDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Naps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
