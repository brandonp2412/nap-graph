import { BaseEntity, User } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public user?: User,
        public naps?: BaseEntity[],
    ) {
    }
}
