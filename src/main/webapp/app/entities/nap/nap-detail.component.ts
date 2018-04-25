import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Nap } from './nap.model';
import { NapService } from './nap.service';

@Component({
    selector: 'jhi-nap-detail',
    templateUrl: './nap-detail.component.html'
})
export class NapDetailComponent implements OnInit, OnDestroy {

    nap: Nap;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private napService: NapService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNaps();
    }

    load(id) {
        this.napService.find(id)
            .subscribe((napResponse: HttpResponse<Nap>) => {
                this.nap = napResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNaps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'napListModification',
            (response) => this.load(this.nap.id)
        );
    }
}
