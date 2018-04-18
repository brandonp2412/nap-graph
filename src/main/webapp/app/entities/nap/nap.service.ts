import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Nap } from './nap.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Nap>;

@Injectable()
export class NapService {

    private resourceUrl =  SERVER_API_URL + 'api/naps';

    constructor(private http: HttpClient) { }

    create(nap: Nap): Observable<EntityResponseType> {
        const copy = this.convert(nap);
        return this.http.post<Nap>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(nap: Nap): Observable<EntityResponseType> {
        const copy = this.convert(nap);
        return this.http.put<Nap>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Nap>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Nap[]>> {
        const options = createRequestOption(req);
        return this.http.get<Nap[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Nap[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Nap = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Nap[]>): HttpResponse<Nap[]> {
        const jsonResponse: Nap[] = res.body;
        const body: Nap[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Nap.
     */
    private convertItemFromServer(nap: Nap): Nap {
        const copy: Nap = Object.assign({}, nap);
        return copy;
    }

    /**
     * Convert a Nap to a JSON which can be sent to the server.
     */
    private convert(nap: Nap): Nap {
        const copy: Nap = Object.assign({}, nap);
        return copy;
    }
}
