import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PersonComponent } from './person.component';
import { PersonDetailComponent } from './person-detail.component';
import { PersonPopupComponent } from './person-dialog.component';
import { PersonDeletePopupComponent } from './person-delete-dialog.component';

export const personRoute: Routes = [
    {
        path: 'person',
        component: PersonComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person/:id',
        component: PersonDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-new',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/edit',
        component: PersonPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person/:id/delete',
        component: PersonDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'People'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
