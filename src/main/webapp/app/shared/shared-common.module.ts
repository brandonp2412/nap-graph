import { LOCALE_ID, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import { JhiAlertComponent, JhiAlertErrorComponent, NapChartSharedLibsModule } from './';

@NgModule({
    imports: [
        NapChartSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        NapChartSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class NapChartSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
