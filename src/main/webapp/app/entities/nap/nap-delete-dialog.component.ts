import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nap } from './nap.model';
import { NapPopupService } from './nap-popup.service';
import { NapService } from './nap.service';

@Component({
    selector: 'jhi-nap-delete-dialog',
    templateUrl: './nap-delete-dialog.component.html'
})
export class NapDeleteDialogComponent {

    nap: Nap;

    constructor(
        private napService: NapService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.napService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'napListModification',
                content: 'Deleted an nap'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nap-delete-popup',
    template: ''
})
export class NapDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private napPopupService: NapPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.napPopupService
                .open(NapDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
