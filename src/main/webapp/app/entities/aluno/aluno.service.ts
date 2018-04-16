import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Aluno } from './aluno.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Aluno>;

@Injectable()
export class AlunoService {

    private resourceUrl =  SERVER_API_URL + 'api/alunos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(aluno: Aluno): Observable<EntityResponseType> {
        const copy = this.convert(aluno);
        return this.http.post<Aluno>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(aluno: Aluno): Observable<EntityResponseType> {
        const copy = this.convert(aluno);
        return this.http.put<Aluno>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Aluno>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Aluno[]>> {
        const options = createRequestOption(req);
        return this.http.get<Aluno[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Aluno[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Aluno = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Aluno[]>): HttpResponse<Aluno[]> {
        const jsonResponse: Aluno[] = res.body;
        const body: Aluno[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Aluno.
     */
    private convertItemFromServer(aluno: Aluno): Aluno {
        const copy: Aluno = Object.assign({}, aluno);
        copy.dataNascimento = this.dateUtils
            .convertLocalDateFromServer(aluno.dataNascimento);
        return copy;
    }

    /**
     * Convert a Aluno to a JSON which can be sent to the server.
     */
    private convert(aluno: Aluno): Aluno {
        const copy: Aluno = Object.assign({}, aluno);
        copy.dataNascimento = this.dateUtils
            .convertLocalDateToServer(aluno.dataNascimento);
        return copy;
    }
}
