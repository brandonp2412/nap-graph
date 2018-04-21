import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Charts } from './charts.model';
import { createRequestOption } from '../../shared';

export type ChartsResponseType = HttpResponse<Charts>;
export type ChartsArrayResponseType = HttpResponse<Charts[]>;

@Injectable()
export class ChartsService {

    private resourceUrl = SERVER_API_URL + 'api/dashboards/charts';

    constructor(private http: HttpClient) { }

    create(charts: Charts): Observable<ChartsResponseType> {
        const copy = this.convert(charts);
        return this.http.post<Charts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: ChartsResponseType) => this.convertResponse(res));
    }

    update(charts: Charts): Observable<ChartsResponseType> {
        const copy = this.convert(charts);
        return this.http.put<Charts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: ChartsResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<ChartsResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Charts>(this.resourceUrl, { observe: 'response' })
            .map((res: ChartsResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: ChartsResponseType): ChartsResponseType {
        const body: Charts = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: ChartsArrayResponseType): ChartsArrayResponseType {
        const jsonResponse: Charts[] = res.body;
        const body: Charts[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Charts.
     */
    private convertItemFromServer(json: any): Charts {
        const copy: Charts = Object.assign(new Charts(), json);
        return copy;
    }

    /**
     * Convert a Charts to a JSON which can be sent to the server.
     */
    private convert(charts: Charts): Charts {
        const copy: Charts = Object.assign({}, charts);
        return copy;
    }
}
