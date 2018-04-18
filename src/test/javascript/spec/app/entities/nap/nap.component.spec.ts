/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NapChartTestModule } from '../../../test.module';
import { NapComponent } from '../../../../../../main/webapp/app/entities/nap/nap.component';
import { NapService } from '../../../../../../main/webapp/app/entities/nap/nap.service';
import { Nap } from '../../../../../../main/webapp/app/entities/nap/nap.model';

describe('Component Tests', () => {

    describe('Nap Management Component', () => {
        let comp: NapComponent;
        let fixture: ComponentFixture<NapComponent>;
        let service: NapService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NapChartTestModule],
                declarations: [NapComponent],
                providers: [
                    NapService
                ]
            })
            .overrideTemplate(NapComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NapComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NapService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Nap(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.naps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
