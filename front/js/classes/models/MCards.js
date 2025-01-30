export class MCards {
    constructor(mDate) {
        this.mDate = mDate;
        this.cards = JSON.parse(localStorage.getItem("flash-cards-tb")) || [];
        this.cardId = JSON.parse(localStorage.getItem("flash-cards-tb-id")) || -1;
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
    }

    // Méthode pour notifier tous les listeners
    notifyListeners() {
        this.listeners.forEach((listener) => listener());
    }


    addCard(card) {
        const currentDate = new Date();
        const dateDMY = this.mDate.getDateInDMY(currentDate);
        card.date = dateDMY;
        card.step = 1;
        this.cardId++;
        card.id = this.cardId;
        this.cards.push(card);
        localStorage.setItem("flash-cards-tb", JSON.stringify(this.cards));
        localStorage.setItem("flash-cards-tb-id", JSON.stringify(this.cardId));
        this.notifyListeners();
    }

    upgradeCard(cardId) {
        const cardSelected = this.cards.find((card) => parseInt(card.id) === parseInt(cardId));

        const newDate = this.mDate.upgradeDateByStep(cardSelected);
        cardSelected.date = newDate;
        if (cardSelected.step < 5) {
            cardSelected.step++;
        }
        localStorage.setItem("flash-cards-tb", JSON.stringify(this.cards));
        this.notifyListeners();
    }

    delayCard(cardId) {
        const cardSelected = this.cards.find((card) => parseInt(card.id) === parseInt(cardId));
        const dateDelayed = this.mDate.delayOneDay(cardSelected);
        cardSelected.date = dateDelayed;
        localStorage.setItem("flash-cards-tb", JSON.stringify(this.cards));
        this.notifyListeners();
    }

    resetCard(cardId) {
        const cardSelected = this.cards.find((card) => parseInt(card.id) === parseInt(cardId));
        const dateInDMY = this.mDate.getDateInDMY(new Date());
        cardSelected.date = dateInDMY;
        cardSelected.step = 1;
        localStorage.setItem("flash-cards-tb", JSON.stringify(this.cards));
        this.notifyListeners();
    }

    deleteCard(cardId) {
        const cards = this.cards.filter((card) => parseInt(card.id) !== parseInt(cardId));
        this.cards = cards;
        localStorage.setItem("flash-cards-tb", JSON.stringify(this.cards));
        this.notifyListeners();
    }

    getCardById(cardId) {
        return this.cards.find((card) => parseInt(card.id) === parseInt(cardId));
    }

    getCardsForWeekRangeDate(weekRangeDate) {
        const currentDay = this.mDate.getCurrentDay();
        for (let i = 0; i < weekRangeDate.length; i++) {
            if ((weekRangeDate[i].day).toLowerCase() === (currentDay.name).toLowerCase()) {
                weekRangeDate[i].isCurrentDay = true;
            } else {
                weekRangeDate[i].isCurrentDay = false;
            }
            for (let j = 0; j < this.cards.length; j++) {
                if (!weekRangeDate[i].cards) {
                    weekRangeDate[i].cards = [];
                }
                if (JSON.stringify(weekRangeDate[i].date) === JSON.stringify(this.cards[j].date)) {

                    weekRangeDate[i].cards.push(this.cards[j]);
                }
            }
        }
        return weekRangeDate;
    }

    isCemetaryNeeded() {
        const ghostsCards = this.mDate.getCardsRIP(this.cards);
        return ghostsCards;
    }
}