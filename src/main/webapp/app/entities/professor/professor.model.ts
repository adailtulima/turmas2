import { BaseEntity } from './../../shared';

export class Professor implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public cargaHoraria?: number,
        public turmas?: BaseEntity[],
    ) {
    }
}
