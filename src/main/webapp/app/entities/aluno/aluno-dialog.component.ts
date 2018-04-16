import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aluno } from './aluno.model';
import { AlunoPopupService } from './aluno-popup.service';
import { AlunoService } from './aluno.service';
import { Turma, TurmaService } from '../turma';

@Component({
    selector: 'jhi-aluno-dialog',
    templateUrl: './aluno-dialog.component.html'
})
export class AlunoDialogComponent implements OnInit {

    aluno: Aluno;
    isSaving: boolean;

    turmas: Turma[];
    dataNascimentoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alunoService: AlunoService,
        private turmaService: TurmaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.turmaService.query()
            .subscribe((res: HttpResponse<Turma[]>) => { this.turmas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.aluno.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alunoService.update(this.aluno));
        } else {
            this.subscribeToSaveResponse(
                this.alunoService.create(this.aluno));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Aluno>>) {
        result.subscribe((res: HttpResponse<Aluno>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Aluno) {
        this.eventManager.broadcast({ name: 'alunoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTurmaById(index: number, item: Turma) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-aluno-popup',
    template: ''
})
export class AlunoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alunoPopupService: AlunoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alunoPopupService
                    .open(AlunoDialogComponent as Component, params['id']);
            } else {
                this.alunoPopupService
                    .open(AlunoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
