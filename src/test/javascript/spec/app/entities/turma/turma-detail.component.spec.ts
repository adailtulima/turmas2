/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Turmas2TestModule } from '../../../test.module';
import { TurmaDetailComponent } from '../../../../../../main/webapp/app/entities/turma/turma-detail.component';
import { TurmaService } from '../../../../../../main/webapp/app/entities/turma/turma.service';
import { Turma } from '../../../../../../main/webapp/app/entities/turma/turma.model';

describe('Component Tests', () => {

    describe('Turma Management Detail Component', () => {
        let comp: TurmaDetailComponent;
        let fixture: ComponentFixture<TurmaDetailComponent>;
        let service: TurmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Turmas2TestModule],
                declarations: [TurmaDetailComponent],
                providers: [
                    TurmaService
                ]
            })
            .overrideTemplate(TurmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Turma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.turma).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
