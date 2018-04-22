import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { DateDuration, DurationRating } from './chart.model';
import { ChartService } from './chart.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
    account: any;
    durationData: any;
    dateData: any;
    durationRatings: DurationRating[];
    dateDurations: DateDuration[];
    _hasDateData: boolean;
    _hasDurationData: boolean;
    optionsDate = {scales: {yAxes: [{scaleLabel: {display: true, labelString: 'Duration (Hours)'}}]}};
    optionsDuration = {
        scales: {
            yAxes: [{scaleLabel: {display: true, labelString: 'Rating (out of 10)'}}],
            xAxes: [{scaleLabel: {display: true, labelString: 'Duration (Hours)'}}]
        }
    };

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
            (res: HttpResponse<DateDuration[]>) => this.onDateSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message));
        this.chartService.getDurationRatings().subscribe(
            (res: HttpResponse<DurationRating[]>) => this.onDurationSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    hasDateData() {
        return this._hasDateData;
    }

    hasDurationData() {
        return this._hasDurationData;
    }

    hasData() {
        return this._hasDurationData || this._hasDateData;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private setDayData(dateDurations) {
        this.dateData = {
            labels: dateDurations.map((dayByDuration) => dayByDuration.date),
            datasets: [{
                label: 'Date by Duration',
                data: dateDurations.map((dayByDuration) => dayByDuration.totalDuration),
                fill: false,
                borderColor: '#4bc0c0'
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

    private onDateSuccess(dayDurations: DateDuration[]) {
        this.dateDurations = dayDurations;
        this.setDayData(dayDurations);
        this._hasDateData = dayDurations.length > 0;
    }

    private onDurationSuccess(durationRatings: DurationRating[] | null) {
        this.durationRatings = durationRatings;
        this.setDurationData(durationRatings);
        this._hasDurationData = durationRatings.length > 0;
    }
}
