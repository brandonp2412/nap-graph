import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Nap } from './nap.model';
import { NapPopupService } from './nap-popup.service';
import { NapService } from './nap.service';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-nap-dialog',
    templateUrl: './nap-dialog.component.html'
})
export class NapDialogComponent implements OnInit {

    nap: Nap;
    isSaving: boolean;

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private napService: NapService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: HttpResponse<Person[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.nap.id !== undefined) {
            this.subscribeToSaveResponse(
                this.napService.update(this.nap));
        } else {
            this.subscribeToSaveResponse(
                this.napService.create(this.nap));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Nap>>) {
        result.subscribe((res: HttpResponse<Nap>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Nap) {
        this.eventManager.broadcast({ name: 'napListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-nap-popup',
    template: ''
})
export class NapPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private napPopupService: NapPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.napPopupService
                    .open(NapDialogComponent as Component, params['id']);
            } else {
                this.napPopupService
                    .open(NapDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
