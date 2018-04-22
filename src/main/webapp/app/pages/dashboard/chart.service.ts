import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DateDuration, DurationRating } from './chart.model';
import { createRequestOption } from '../../shared';

export type DayArrayResponseType = HttpResponse<DateDuration[]>;
export type DurationArrayResponseType = HttpResponse<DurationRating[]>;

@Injectable()
export class ChartService {

    private static convertDayArrayResponse(res: DayArrayResponseType): DayArrayResponseType {
        const jsonResponse: DateDuration[] = res.body;
        const body: DateDuration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(ChartService.convertDayFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chart.
     */
    private static convertDayFromServer(json: any): DateDuration {
        return Object.assign(new DateDuration(), json);
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

    constructor(private http: HttpClient) {
    }

    getDayDurations(req?: any): Observable<HttpResponse<DateDuration[]>> {
        const options = createRequestOption(req);
        return this.http.get<DateDuration[]>(`${SERVER_API_URL}/api/date-durations/user`, {
            params: options,
            observe: 'response'
        }).map((res: HttpResponse<DateDuration[]>) => ChartService.convertDayArrayResponse(res));
    }

    getDurationRatings(req?: any): Observable<HttpResponse<DurationRating[]>> {
        const options = createRequestOption(req);
        return this.http.get<DurationRating[]>(`${SERVER_API_URL}/api/duration-ratings/user`,
            {params: options, observe: 'response'})
            .map((res: HttpResponse<DurationRating[]>) => ChartService.convertDurationArrayResponse(res));
    }
}
