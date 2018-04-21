import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../../shared';
import {
    ChartsService,
    ChartsComponent,
    DashboardsRoute,
} from './';

const PAGE_SET_STATES = [
    ...DashboardsRoute,
];

@NgModule({
    imports: [
        NapChartSharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, { useHash: true })
    ],
    declarations: [
    ChartsComponent,
],
    entryComponents: [
    ChartsComponent,
],
    providers: [
    ChartsService,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NapChartDashboardsModule {}
