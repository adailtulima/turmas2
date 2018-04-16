import { BaseEntity } from './../../shared';

export class Aluno implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public dataNascimento?: any,
        public idade?: number,
        public matricula?: string,
        public sexo?: string,
        public turma?: BaseEntity,
    ) {
    }
}
