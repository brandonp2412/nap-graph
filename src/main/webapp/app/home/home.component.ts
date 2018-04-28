import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { Subscription } from 'rxjs/Subscription';
import { OPTIONS_DATE, OPTIONS_DURATION } from '../pages/dashboard/chart.options';
import { SAMPLE_DATE_DURATION, SAMPLE_DURATION_RATING } from './home.sample.data';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    eventSubscriber: Subscription;
    durationData = {labels: [], datasets: []};
    dateData = {labels: [], datasets: []};
    optionsDate = OPTIONS_DATE;
    optionsDuration = OPTIONS_DURATION;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService) {
    }

    ngOnInit() {
        if (!this.principal.isAuthenticated()) {
            this.setDateData(SAMPLE_DATE_DURATION);
            this.setDurationData(SAMPLE_DURATION_RATING);
        }
    }

    private setDateData(dateDurations) {
        this.dateData = {
            labels: dateDurations.map((dayByDuration) => dayByDuration.localDate),
            datasets: [{
                label: 'Date by Duration',
                data: dateDurations.map((dayByDuration) => dayByDuration.totalDuration),
                fill: false,
                borderColor: '#4bc0c0',
            }]
        };
    }

    private setDurationData(durationRatings) {
        this.durationData = {
            labels: durationRatings.map((durationByRating) => durationByRating.duration),
            datasets: [{
                label: 'Duration by Rating',
                data: durationRatings.map((durationByRating) => durationByRating.averageRating),
                fill: false,
                borderColor: '#565656'
            }]
        };
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
