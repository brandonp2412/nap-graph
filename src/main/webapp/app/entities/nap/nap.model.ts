import { BaseEntity, User } from './../../shared';

export class Nap implements BaseEntity {
    constructor(
        public id?: number,
        public duration?: number,
        public rating?: number,
        public localDate?: any,
        public exercise?: boolean,
        public user?: User,
    ) {
        this.exercise = false;
    }
}
