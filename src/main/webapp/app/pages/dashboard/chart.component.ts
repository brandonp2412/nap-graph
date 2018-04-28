import { Component, OnInit} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

import { DateDuration, DurationRating } from './chart.model';
import { ChartService } from './chart.service';
import { OPTIONS_DATE, OPTIONS_DURATION } from './chart.options';

@Component({
    selector: 'jhi-chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
    durationData = {labels: [], datasets: []};
    dateData = {labels: [], datasets: []};
    optionsDate = OPTIONS_DATE;
    optionsDuration = OPTIONS_DURATION;

    constructor(
        private chartService: ChartService,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    ngOnInit() {
        this.chartService.getDayDurations().subscribe(
            (res: HttpResponse<DateDuration[]>) => this.setDateData(res.body),
            (res: HttpErrorResponse) => this.onError(res.message));
        this.chartService.getDurationRatings().subscribe(
            (res: HttpResponse<DurationRating[]>) => this.setDurationData(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    hasData() {
        return this.dateData.datasets.length === 1 || this.dateData.datasets.length === 1;
    }

    hasDateData() {
        return this.dateData.datasets.length === 1;
    }

    hasDurationData() {
        return this.durationData.datasets.length === 1;
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

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
