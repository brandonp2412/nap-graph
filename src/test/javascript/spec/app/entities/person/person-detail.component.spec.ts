/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NapChartTestModule } from '../../../test.module';
import { PersonDetailComponent } from '../../../../../../main/webapp/app/entities/person/person-detail.component';
import { PersonService } from '../../../../../../main/webapp/app/entities/person/person.service';
import { Person } from '../../../../../../main/webapp/app/entities/person/person.model';

describe('Component Tests', () => {

    describe('Person Management Detail Component', () => {
        let comp: PersonDetailComponent;
        let fixture: ComponentFixture<PersonDetailComponent>;
        let service: PersonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NapChartTestModule],
                declarations: [PersonDetailComponent],
                providers: [
                    PersonService
                ]
            })
            .overrideTemplate(PersonDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Person(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.person).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
