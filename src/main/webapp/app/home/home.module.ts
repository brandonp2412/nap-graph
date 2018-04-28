import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { ChartModule } from 'primeng/chart';

@NgModule({
    imports: [
        NapChartSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        ChartModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NapChartHomeModule {}
