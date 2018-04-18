import { BaseEntity } from './../../shared';

export const enum DayType {
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
}

export class Nap implements BaseEntity {
    constructor(
        public id?: number,
        public duration?: number,
        public rating?: number,
        public day?: DayType,
        public exercise?: boolean,
        public person?: BaseEntity,
    ) {
        this.exercise = false;
    }
}
