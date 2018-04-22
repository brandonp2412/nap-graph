export class Chart {
}

export class DurationRating {
    constructor(
        public duration?: number,
        public averageRating?: number
    ) {
    }
}

export class DateDuration {
    constructor(
        public date?: Date,
        public duration?: number
    ) {
    }
}
