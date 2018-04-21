import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Chart, DateDuration, DurationRating } from './chart.model';
import { ChartService } from './chart.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
    account: any;
    durationData: any;
    dayData: any;
    durationByRating: DurationRating[];
    dayByDuration: DateDuration[];

    constructor(
        private chartService: ChartService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.chartService.getDayDurations().subscribe(
            (res: HttpResponse<DateDuration[]>) => this.onDaySuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message));
        this.chartService.getDurationRatings().subscribe(
            (res: HttpResponse<DurationRating[]>) => this.onDurationSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private setDayData(dayDurations) {
        this.dayData = {
            labels: dayDurations.map((dayByDuration) => dayByDuration.day),
            datasets: [{
                label: 'Day by Duration (Hours)',
                data: dayDurations.map((dayByDuration) => dayByDuration.totalDuration),
                fill: false,
                borderColor: '#4bc0c0'
            }]
        };
    }

    private setDurationData(durationRatings) {
        this.durationData = {
            labels: durationRatings.map((durationByRating) => durationByRating.duration),
            datasets: [{
                label: 'Duration by Rating (out of 10)',
                data: durationRatings.map((durationByRating) => durationByRating.averageRating),
                fill: false,
                borderColor: '#565656'
            }]
        };
    }

    private onDaySuccess(dayDurations: DateDuration[]) {
        this.dayByDuration = dayDurations;
        this.setDayData(dayDurations);
    }

    private onDurationSuccess(durationRatings: DurationRating[] | null) {
        this.durationByRating = durationRatings;
        this.setDurationData(durationRatings);
    }
}