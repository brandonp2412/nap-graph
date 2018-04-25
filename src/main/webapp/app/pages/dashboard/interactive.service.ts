import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Interactive } from './interactive.model';
import { createRequestOption } from '../../shared';

export type InteractiveResponseType = HttpResponse<Interactive>;
export type InteractiveArrayResponseType = HttpResponse<Interactive[]>;

@Injectable()
export class InteractiveService {

    private resourceUrl = SERVER_API_URL + 'api/dashboard/interactive';

    constructor(private http: HttpClient) { }

    private convertResponse(res: InteractiveResponseType): InteractiveResponseType {
        const body: Interactive = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: InteractiveArrayResponseType): InteractiveArrayResponseType {
        const jsonResponse: Interactive[] = res.body;
        const body: Interactive[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Interactive.
     */
    private convertItemFromServer(json: any): Interactive {
        const copy: Interactive = Object.assign(new Interactive(), json);
        return copy;
    }

    /**
     * Convert a Interactive to a JSON which can be sent to the server.
     */
    private convert(interactive: Interactive): Interactive {
        const copy: Interactive = Object.assign({}, interactive);
        return copy;
    }
}
