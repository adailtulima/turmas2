import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Professor } from './professor.model';
import { ProfessorPopupService } from './professor-popup.service';
import { ProfessorService } from './professor.service';
import { Turma, TurmaService } from '../turma';

@Component({
    selector: 'jhi-professor-dialog',
    templateUrl: './professor-dialog.component.html'
})
export class ProfessorDialogComponent implements OnInit {

    professor: Professor;
    isSaving: boolean;

    turmas: Turma[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private professorService: ProfessorService,
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
        if (this.professor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professorService.update(this.professor));
        } else {
            this.subscribeToSaveResponse(
                this.professorService.create(this.professor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Professor>>) {
        result.subscribe((res: HttpResponse<Professor>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Professor) {
        this.eventManager.broadcast({ name: 'professorListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-professor-popup',
    template: ''
})
export class ProfessorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorPopupService: ProfessorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professorPopupService
                    .open(ProfessorDialogComponent as Component, params['id']);
            } else {
                this.professorPopupService
                    .open(ProfessorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
