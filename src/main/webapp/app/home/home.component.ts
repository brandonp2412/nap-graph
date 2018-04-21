import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { NapService } from '../entities/nap';
import { SAMPLE_DATA } from './home.sample.data';

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
    dayByDuration: any;
    durationByRating: any;
    private naps: any[];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private napService: NapService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.setData();
        this.registerAuthenticationSuccess();
        this.registerLogoutSuccess();
        this.setDayByDuration();
        this.setDurationByRating();
    }

    private setDurationByRating() {
        const stats = this.getDurationByRating();
        this.durationByRating = {
            labels: stats.durations,
            datasets: [
                {
                    label: 'Duration by Rating',
                    data: stats.ratings,
                    fill: false,
                    borderColor: '#4bc0c0'
                }
            ]
        };
    }

    private getDurationByRating() {
        const stats = {};
        this.naps.forEach((nap) => {
            if (stats[nap.duration]) {
                stats[nap.duration] += nap.rating;
            } else {
                stats[nap.duration] = nap.rating;
            }
        });
        const container = {ratings: [], durations: []};
        for (const key of Object.keys(stats)) {
            container.ratings.push(stats[key]);
            container.durations.push(key);
        }
        return container;
    }

    private setData() {
        if (this.isAuthenticated()) {
            this.napService.query().subscribe((naps) => this.naps = naps.body);
        } else {
            this.naps = SAMPLE_DATA;
        }
    }

    private setDayByDuration() {
        const stats = this.getDayByDuration();
        this.dayByDuration = {
            labels: stats.days,
            datasets: [
                {
                    label: 'Hours of sleep by Day',
                    data: stats.durations,
                    fill: false,
                    borderColor: '#4bc0c0'
                }
            ]
        };
    }

    private getDayByDuration() {
        const stats = {};
        this.naps.forEach((nap) => {
            if (stats[nap.day]) {
                stats[nap.day] += nap.duration;
            } else {
                stats[nap.day] = nap.duration;
            }
        });
        const container = {days: [], durations: []};
        for (const key of Object.keys(stats)) {
            container.days.push(key);
            container.durations.push(stats[key]);
        }
        return container;
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private registerLogoutSuccess() {
        this.eventManager.subscribe('logoutSuccess', (message) => {
            this.naps = SAMPLE_DATA;
        });
    }
}
