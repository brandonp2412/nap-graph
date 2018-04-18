/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NapChartTestModule } from '../../../test.module';
import { NapDetailComponent } from '../../../../../../main/webapp/app/entities/nap/nap-detail.component';
import { NapService } from '../../../../../../main/webapp/app/entities/nap/nap.service';
import { Nap } from '../../../../../../main/webapp/app/entities/nap/nap.model';

describe('Component Tests', () => {

    describe('Nap Management Detail Component', () => {
        let comp: NapDetailComponent;
        let fixture: ComponentFixture<NapDetailComponent>;
        let service: NapService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NapChartTestModule],
                declarations: [NapDetailComponent],
                providers: [
                    NapService
                ]
            })
            .overrideTemplate(NapDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NapDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NapService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Nap(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nap).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
