import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Person } from './person.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Person>;

@Injectable()
export class PersonService {

    private resourceUrl =  SERVER_API_URL + 'api/people';

    constructor(private http: HttpClient) { }

    create(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<Person>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(person: Person): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.put<Person>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Person>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Person[]>> {
        const options = createRequestOption(req);
        return this.http.get<Person[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Person[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Person = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Person[]>): HttpResponse<Person[]> {
        const jsonResponse: Person[] = res.body;
        const body: Person[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Person.
     */
    private convertItemFromServer(person: Person): Person {
        const copy: Person = Object.assign({}, person);
        return copy;
    }

    /**
     * Convert a Person to a JSON which can be sent to the server.
     */
    private convert(person: Person): Person {
        const copy: Person = Object.assign({}, person);
        return copy;
    }
}
