import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../../shared';
import {
    ChartService,
    ChartComponent,
    InteractiveService,
    InteractiveComponent,
    DashboardRoute,
} from './';
import { ChartModule } from 'primeng/chart';

const PAGE_SET_STATES = [
    ...DashboardRoute,
];

@NgModule({
    imports: [
        NapChartSharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, { useHash: true }),
        ChartModule
    ],
    declarations: [
    ChartComponent,
    InteractiveComponent,
],
    entryComponents: [
    ChartComponent,
    InteractiveComponent,
],
    providers: [
    ChartService,
    InteractiveService,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NapChartDashboardModule {}
