import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Turmas2AlunoModule } from './aluno/aluno.module';
import { Turmas2ProfessorModule } from './professor/professor.module';
import { Turmas2TurmaModule } from './turma/turma.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Turmas2AlunoModule,
        Turmas2ProfessorModule,
        Turmas2TurmaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Turmas2EntityModule {}
