import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { InteractiveService } from './interactive.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-interactive',
    templateUrl: './interactive.component.html'
})
export class InteractiveComponent implements OnInit, OnDestroy {

    currentAccount: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private interactiveService: InteractiveService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

    }

    ngOnDestroy() {

    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
