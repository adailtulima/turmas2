import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Turma } from './turma.model';
import { TurmaService } from './turma.service';

@Component({
    selector: 'jhi-turma-detail',
    templateUrl: './turma-detail.component.html'
})
export class TurmaDetailComponent implements OnInit, OnDestroy {

    turma: Turma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private turmaService: TurmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTurmas();
    }

    load(id) {
        this.turmaService.find(id)
            .subscribe((turmaResponse: HttpResponse<Turma>) => {
                this.turma = turmaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTurmas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'turmaListModification',
            (response) => this.load(this.turma.id)
        );
    }
}
