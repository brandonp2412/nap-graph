import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ChartComponent } from './chart.component';
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
];
