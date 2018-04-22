import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../../shared';
import { ChartComponent, ChartService, DashboardRoute, InteractiveComponent, InteractiveService, } from './';

const PAGE_SET_STATES = [
    ...DashboardRoute,
];

@NgModule({
    imports: [
        NapChartSharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, {useHash: true})
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

export class NapChartDashboardModule {
}
