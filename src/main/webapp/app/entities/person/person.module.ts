import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NapChartSharedModule } from '../../shared';
import { NapChartAdminModule } from '../../admin/admin.module';
import {
    PersonService,
    PersonPopupService,
    PersonComponent,
    PersonDetailComponent,
    PersonDialogComponent,
    PersonPopupComponent,
    PersonDeletePopupComponent,
    PersonDeleteDialogComponent,
    personRoute,
    personPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        NapChartSharedModule,
        NapChartAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonComponent,
        PersonDetailComponent,
        PersonDialogComponent,
        PersonDeleteDialogComponent,
        PersonPopupComponent,
        PersonDeletePopupComponent,
    ],
    entryComponents: [
        PersonComponent,
        PersonDialogComponent,
        PersonPopupComponent,
        PersonDeleteDialogComponent,
        PersonDeletePopupComponent,
    ],
    providers: [
        PersonService,
        PersonPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NapChartPersonModule {}
