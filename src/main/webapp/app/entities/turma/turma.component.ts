import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Turma } from './turma.model';
import { TurmaService } from './turma.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-turma',
    templateUrl: './turma.component.html'
})
export class TurmaComponent implements OnInit, OnDestroy {
turmas: Turma[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private turmaService: TurmaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.turmaService.query().subscribe(
            (res: HttpResponse<Turma[]>) => {
                this.turmas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTurmas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Turma) {
        return item.id;
    }
    registerChangeInTurmas() {
        this.eventSubscriber = this.eventManager.subscribe('turmaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
