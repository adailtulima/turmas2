import { BaseEntity } from './../../shared';

export class Turma implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: string,
        public nAlunos?: number,
        public alunos?: BaseEntity[],
        public professores?: BaseEntity[],
    ) {
    }
}
