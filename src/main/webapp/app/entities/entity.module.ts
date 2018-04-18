import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NapChartPersonModule } from './person/person.module';
import { NapChartNapModule } from './nap/nap.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NapChartPersonModule,
        NapChartNapModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NapChartEntityModule {}
