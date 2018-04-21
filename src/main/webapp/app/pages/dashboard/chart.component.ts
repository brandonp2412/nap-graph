import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Chart, DayByDuration, DurationByRating } from './chart.model';
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
    durationByRating: DurationByRating[];
    dayByDuration: DayByDuration[];

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
            (res: HttpResponse<DayByDuration[]>) => this.onDaySuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private setDayData(body) {
        this.dayData = {
            labels: body.map((dayByDuration) => dayByDuration.day),
            datasets: [{
                label: 'Day by Duration (Hours)',
                data: body.map((dayByDuration) => dayByDuration.totalDuration),
                fill: false,
                borderColor: '#4bc0c0'
            }]
        };
    }

    private onDaySuccess(body: DayByDuration[]) {
        this.dayByDuration = body;
        this.setDayData(body);
    }
}
