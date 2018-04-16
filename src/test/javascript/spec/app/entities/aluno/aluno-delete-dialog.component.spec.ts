/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Turmas2TestModule } from '../../../test.module';
import { AlunoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/aluno/aluno-delete-dialog.component';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno/aluno.service';

describe('Component Tests', () => {

    describe('Aluno Management Delete Component', () => {
        let comp: AlunoDeleteDialogComponent;
        let fixture: ComponentFixture<AlunoDeleteDialogComponent>;
        let service: AlunoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Turmas2TestModule],
                declarations: [AlunoDeleteDialogComponent],
                providers: [
                    AlunoService
                ]
            })
            .overrideTemplate(AlunoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlunoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlunoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
