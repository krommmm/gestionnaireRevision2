export class MDate {
    constructor() {
        this.daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    }

    getDateInDMY(date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return [day, month, year];
    }

    upgradeDateByStep(card) {
        const date = this.getDateFromDateDMY(card.date);
        const dateMs = this.getDateMs(date);

        let upgradedDateMs;
        switch (card.step) {
            case 1:
                upgradedDateMs = dateMs + 1000 * 60 * 60 * 24;
                break;

            case 2:
                upgradedDateMs = dateMs + 1000 * 60 * 60 * 24 * 3;
                break;

            case 3:
                upgradedDateMs = dateMs + 1000 * 60 * 60 * 24 * 7;
                break;

            case 4:
                upgradedDateMs = dateMs + 1000 * 60 * 60 * 24 * 30;
                break;

            case 5:
                upgradedDateMs = dateMs + 1000 * 60 * 60 * 24 * 180;
                break;

            default:
                throw new Error("Step unknown");
        }

        const upgradedDate = new Date(upgradedDateMs);
        return this.getDateInDMY(upgradedDate);
    }

    getNextStepInfo(card) {
        const step = card.step;
        let stepTime;
        switch (step) {
            case 1:
                stepTime = "1 jour";
                break;

            case 2:
                stepTime = "3 jours";
                break;

            case 3:
                stepTime = "1 semaine";
                break;

            case 4:
                stepTime = "1 mois";
                break;

            case 5:
                stepTime = "6 mois";
                break;

            default:
                throw new Error("Step unknown");
        }
        return stepTime;

    }

    delayOneDay(card) {
        const date = this.getDateFromDateDMY(card.date);
        const dateMs = this.getDateMs(date);
        const delayDateMs = dateMs + 1000 * 60 * 60 * 24;
        const delayDate = new Date(delayDateMs);
        const delayDateDMY = this.getDateInDMY(delayDate);
        return delayDateDMY;
    }

    getDateMs(date) {
        return date.getTime();
    }

    detectionDate() {
        const date = new Date();
        return date;
    }

    getCurrentDay() {
        const date = new Date();
        const day = date.getDay();
        return {
            name: this.daysOfWeek[day],
            num: day
        }
    }

    detectionWeek() {
        const date = this.detectionDate();
        // const date = this.getDateFromDateDMY([21, 0, 2025]);
        const weekRange = this.getRangeWeek(date);
        for (let i = 0; i < weekRange.length; i++) {
            weekRange[i].date = this.getDateInDMY(weekRange[i].date);
        }
        return weekRange;
    }

    getDateFromDateDMY(dateDMY) {
        const day = dateDMY[0];
        const month = dateDMY[1];
        const year = dateDMY[2];
        const date = new Date(Date.UTC(year, month, day));
        return date;
    }

    getRangeWeek(date) {
        const day = date.getDay();

        const week = [
            { day: "lundi" },
            { day: "mardi" },
            { day: "mercredi" },
            { day: "jeudi" },
            { day: "vendredi" },
            { day: "samedi" },
            { day: "dimanche" }
        ];

        // calcul de la date de lundi (ou de lundi dernier si on est dimanche)
        const lundi = day === 0 ? new Date(date.setDate(date.getDate() - 6)) : new Date(date.setDate(date.getDate() - (day - 1)));
        week[0].date = lundi;

        // ajout de la date pour les autres jours
        for (let i = 1; i < 7; i++) {
            week[i].date = new Date(lundi.getFullYear(), lundi.getMonth(), lundi.getDate() + i)
        }
        return week;
    }

    getCardsRIP(cards) {
        const date = new Date();
        const currentDateDMY = this.getDateInDMY(date);
        const currentDate = this.getDateFromDateDMY(currentDateDMY);
        const currentDateMs = this.getDateMs(currentDate);
        const pastCards = [];
        for (let i = 0; i < cards.length; i++) {
            const day = cards[i].date[0];
            const month = cards[i].date[1];
            const year = cards[i].date[2];
            const cardDate = new Date(year, month, day);
            const cardDateMs = this.getDateMs(cardDate);

            if (cardDateMs < currentDateMs - (1000 * 60 * 60 * 1)) {
                pastCards.push(cards[i]);
            }
        }
        return pastCards;
    }
}