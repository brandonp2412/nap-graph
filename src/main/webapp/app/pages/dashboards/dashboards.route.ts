import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ChartsComponent } from './charts.component';
export const DashboardsRoute: Routes = [
    {
        path: 'dashboards-charts',
        component: ChartsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Charts'
        },
        canActivate: [UserRouteAccessService]
    },
];
