import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Professor } from './professor.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Professor>;

@Injectable()
export class ProfessorService {

    private resourceUrl =  SERVER_API_URL + 'api/professors';

    constructor(private http: HttpClient) { }

    create(professor: Professor): Observable<EntityResponseType> {
        const copy = this.convert(professor);
        return this.http.post<Professor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(professor: Professor): Observable<EntityResponseType> {
        const copy = this.convert(professor);
        return this.http.put<Professor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Professor>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Professor[]>> {
        const options = createRequestOption(req);
        return this.http.get<Professor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Professor[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Professor = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Professor[]>): HttpResponse<Professor[]> {
        const jsonResponse: Professor[] = res.body;
        const body: Professor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Professor.
     */
    private convertItemFromServer(professor: Professor): Professor {
        const copy: Professor = Object.assign({}, professor);
        return copy;
    }

    /**
     * Convert a Professor to a JSON which can be sent to the server.
     */
    private convert(professor: Professor): Professor {
        const copy: Professor = Object.assign({}, professor);
        return copy;
    }
}
