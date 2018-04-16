import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Turma } from './turma.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Turma>;

@Injectable()
export class TurmaService {

    private resourceUrl =  SERVER_API_URL + 'api/turmas';

    constructor(private http: HttpClient) { }

    create(turma: Turma): Observable<EntityResponseType> {
        const copy = this.convert(turma);
        return this.http.post<Turma>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(turma: Turma): Observable<EntityResponseType> {
        const copy = this.convert(turma);
        return this.http.put<Turma>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Turma>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Turma[]>> {
        const options = createRequestOption(req);
        return this.http.get<Turma[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Turma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Turma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Turma[]>): HttpResponse<Turma[]> {
        const jsonResponse: Turma[] = res.body;
        const body: Turma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Turma.
     */
    private convertItemFromServer(turma: Turma): Turma {
        const copy: Turma = Object.assign({}, turma);
        return copy;
    }

    /**
     * Convert a Turma to a JSON which can be sent to the server.
     */
    private convert(turma: Turma): Turma {
        const copy: Turma = Object.assign({}, turma);
        return copy;
    }
}
