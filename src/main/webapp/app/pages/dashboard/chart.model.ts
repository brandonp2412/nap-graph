import { DayType } from '../../entities/nap';

export class Chart {

}

export class DurationRating {
    constructor(
        public duration?: number,
        public averageRating?: number
    ) {
    }
}

export class DayDuration {
    constructor(
        public day?: DayType,
        public totalDuration?: number
    ) {
    }
}
