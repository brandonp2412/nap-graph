import { DayType } from '../../entities/nap';

export class Chart {

}

export class DurationByRating {
    constructor(
        public duration?: number,
        public averageRating?: number
    ) {
    }
}

export class DayByDuration {
    constructor(
        public day?: DayType,
        public totalDuration?: number
    ) {
    }
}
