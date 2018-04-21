import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Chart, DayByDuration } from './chart.model';
import { createRequestOption } from '../../shared';

export type DayResponseType = HttpResponse<DayByDuration>;
export type DayArrayResponseType = HttpResponse<DayByDuration[]>;

@Injectable()
export class ChartService {

    private resourceUrl = SERVER_API_URL + 'api/dashboard/chart';

    private static convertResponse(res: DayResponseType): DayResponseType {
        const body: Chart = ChartService.convertDayFromServer(res.body);
        return res.clone({body});
    }

    private static convertArrayResponse(res: DayArrayResponseType): DayArrayResponseType {
        const jsonResponse: Chart[] = res.body;
        const body: Chart[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(ChartService.convertDayFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chart.
     */
    private static convertDayFromServer(json: any): DayByDuration {
        return Object.assign(new DayByDuration(), json);
    }

    /**
     * Convert a Chart to a JSON which can be sent to the server.
     */
    private static convert(chart: Chart): Chart {
        return Object.assign({}, chart);
    }

    constructor(private http: HttpClient) { }

    getDayDurations(req?: any): Observable<HttpResponse<DayByDuration[]>> {
        const options = createRequestOption(req);
        return this.http.get<DayByDuration[]>(`${SERVER_API_URL}/api/day-durations`, {params: options,
            observe: 'response'}).map((res: HttpResponse<DayByDuration[]>) => ChartService.convertArrayResponse(res));
    }
}
