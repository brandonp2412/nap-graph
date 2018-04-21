import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Chart, DayDuration, DurationRating } from './chart.model';
import { createRequestOption } from '../../shared';

export type DayArrayResponseType = HttpResponse<DayDuration[]>;
export type DurationArrayResponseType = HttpResponse<DurationRating[]>;

@Injectable()
export class ChartService {

    private static convertDayArrayResponse(res: DayArrayResponseType): DayArrayResponseType {
        const jsonResponse: DayDuration[] = res.body;
        const body: DayDuration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(ChartService.convertDayFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chart.
     */
    private static convertDayFromServer(json: any): DayDuration {
        return Object.assign(new DayDuration(), json);
    }

    private static convertDurationArrayResponse(res: DurationArrayResponseType): DurationArrayResponseType {
        const jsonResponse: DurationRating[] = res.body;
        const body: DurationRating[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(ChartService.convertDurationFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chart.
     */
    private static convertDurationFromServer(json: any): DurationRating {
        return Object.assign(new DurationRating(), json);
    }

    constructor(private http: HttpClient) { }

    getDayDurations(req?: any): Observable<HttpResponse<DayDuration[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayDuration[]>(`${SERVER_API_URL}/api/day-durations`, {params: options,
            observe: 'response'}).map((res: HttpResponse<DayDuration[]>) => ChartService.convertDayArrayResponse(res));
    }

    getDurationRatings(req?: any): Observable<HttpResponse<DurationRating[]>> {
        const options = createRequestOption(req);
        return this.http.get<DurationRating[]>(`${SERVER_API_URL}/api/duration-ratings`,
            {params: options, observe: 'response'})
            .map((res: HttpResponse<DurationRating[]>) => ChartService.convertDurationArrayResponse(res));
    }
}
