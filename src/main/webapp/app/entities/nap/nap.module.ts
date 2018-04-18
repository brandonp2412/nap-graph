import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../../shared';
import {
    NapService,
    NapPopupService,
    NapComponent,
    NapDetailComponent,
    NapDialogComponent,
    NapPopupComponent,
    NapDeletePopupComponent,
    NapDeleteDialogComponent,
    napRoute,
    napPopupRoute,
} from './';

const ENTITY_STATES = [
    ...napRoute,
    ...napPopupRoute,
];

@NgModule({
    imports: [
        NapChartSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NapComponent,
        NapDetailComponent,
        NapDialogComponent,
        NapDeleteDialogComponent,
        NapPopupComponent,
        NapDeletePopupComponent,
    ],
    entryComponents: [
        NapComponent,
        NapDialogComponent,
        NapPopupComponent,
        NapDeleteDialogComponent,
        NapDeletePopupComponent,
    ],
    providers: [
        NapService,
        NapPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NapChartNapModule {}
