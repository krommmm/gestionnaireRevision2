export class MAgenda {
    constructor(mDate) {
        this.mDate = mDate;
    }

    getWeekDateInfo() {
        const week = this.mDate.detectionWeek();
        return week;
    }


}