import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../../shared';
import { NapChartAdminModule } from '../../admin/admin.module';
import {
    NapComponent,
    NapDeleteDialogComponent,
    NapDeletePopupComponent,
    NapDetailComponent,
    NapDialogComponent,
    NapPopupComponent,
    napPopupRoute,
    NapPopupService,
    napRoute,
    NapService,
} from './';

const ENTITY_STATES = [
    ...napRoute,
    ...napPopupRoute,
];

@NgModule({
    imports: [
        NapChartSharedModule,
        NapChartAdminModule,
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
export class NapChartNapModule {
}
