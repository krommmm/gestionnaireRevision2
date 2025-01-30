import { BaseController } from "./BaseController.js";

export class AgendaController extends BaseController {
    constructor(pagesUI, mCards, mDate, uiCards, uiModal, mModal, mAgenda) {
        super();
        this.pagesUI = pagesUI;
        this.mCards = mCards;
        this.mDate = mDate;
        this.uiCards = uiCards;
        this.uiModal = uiModal;
        this.mModal = mModal;
        this.mAgenda = mAgenda;
        this.mCards.addListener(() => this.refresh());
        this.init();
    }

    init() {
        this.refresh();
        this.bindEvents();
    }

    refresh() {
        const weekRangeDateAndCards = this.tryAgendaHebdo();
        this.displayRoot(weekRangeDateAndCards);
        const dayElement = this.determinateDay();
        if (dayElement) this.loadCards(dayElement);
    }

    bindEvents() {
        const root = document.getElementById("root");
        const modal = document.getElementById("modal");

        if (root) root.removeEventListener("click", this.handleClickRoot.bind(this));
        if (root) root.removeEventListener("submit", this.handleSubmitRoot.bind(this));
        if (modal) modal.removeEventListener("submit", this.handleSubmitModal.bind(this));
        if (modal) modal.removeEventListener("click", this.handleClickModal.bind(this));

        if (root) root.addEventListener("click", this.handleClickRoot.bind(this));
        if (root) root.addEventListener("submit", this.handleSubmitRoot.bind(this));
        if (modal) modal.addEventListener("submit", this.handleSubmitModal.bind(this));
        if (modal) modal.addEventListener("click", this.handleClickModal.bind(this));
    }

    handleClickRoot(e) {
        if (e.target.classList.contains("agenda__container__main__cards__li")
            || e.target.classList.contains("agenda__container__main__cards__img")
            || e.target.classList.contains("agenda__container__main__cards__para")) {
            this.handleClickTask(e);
        } else if (e.target.classList.contains("agenda__container__header__day")
            || e.target.classList.contains("agenda__container__header__day--day")
            || e.target.classList.contains("date")
            || e.target.classList.contains("cardsLength")) {
            this.handleClickDay(e);
        } else if (e.target.classList.contains("btn-addCard")) {
            this.handleClickBtnAdd(e);
        }
    }

    handleClickModal(e) {
        if (e.target.classList.contains("modal__quit--quitBtn")) {
            this.uiModal.close();
        } else if (e.target.classList.contains("modal__buttons__nextStep")) {
            const cardId = e.target.dataset.id;
            this.mCards.upgradeCard(cardId);
            this.uiModal.close();
            this.refresh();
        } else if (e.target.classList.contains("modal__buttons__delay")) {
            const cardId = e.target.dataset.id;
            this.mCards.delayCard(cardId);
            this.uiModal.close();
            this.refresh();
        } else if (e.target.classList.contains("modal__buttons__reset")) {
            const cardId = e.target.dataset.id;
            this.mCards.resetCard(cardId);
            this.uiModal.close();
            this.refresh();
        } else if (e.target.classList.contains("modal__buttons__delete")) {
            const cardId = e.target.dataset.id;
            this.mCards.deleteCard(cardId);
            this.uiModal.close();
            this.refresh();
        }
    }

    handleSubmitRoot(e) {
        if (e) e.preventDefault();
        // console.log(e.target);
    }

    handleSubmitModal(e) {
        e.preventDefault();
        if (e.target.id === "form-AddCard") {
            this.handleSubmitFormAdd(e);
        }
    }

    handleSubmitFormAdd(e) {
        e.preventDefault();
        const form = e.target;
        const fields = this.mModal.getFormFieldsValue(form);
        this.mCards.addCard(fields);
        this.uiModal.close();
        const weekRangeDateAndCards = this.tryAgendaHebdo();
        this.displayRoot(weekRangeDateAndCards);
        const $dayEl = this.determinateDay();
        this.loadCards($dayEl);
    }

    tryAgendaHebdo() {
        const weekRangeDate = this.mAgenda.getWeekDateInfo();
        const weekRangeDateAndCards = this.mCards.getCardsForWeekRangeDate(weekRangeDate);
        return weekRangeDateAndCards
    }

    displayRoot(weekRangeDateAndCards) {
        this.mCards.cards.length <= 0 ? this.pagesUI.displayAccueil() : this.pagesUI.displayAgenda(weekRangeDateAndCards);
    }

    handleClickBtnAdd(e) {
        if (e.target.classList.contains("btn-addCard")) {
            e.preventDefault();
            this.uiModal.displayFormAddCard();
            this.uiModal.open();
            return;
        }
    }

    handleClickDay(e) {
        const dayElement = e.target.closest(".agenda__container__header__day");
        if (dayElement) {
            this.changeDay(dayElement);
            this.loadCards(dayElement);
            return;
        }
    }

    handleClickTask(e) {
        const cardElement = e.target.closest(".agenda__container__main__cards__li");
        if (cardElement) {
            const cardId = cardElement.dataset.id;
            const card = this.mCards.getCardById(cardId);
            this.uiModal.open();
            const infoNextStep = this.mDate.getNextStepInfo(card);
            this.uiModal.displayUpdateCard(card,infoNextStep);
            return;
        }
    }


    loadCards($dayEl) {
        const weekRangeDateAndCards = this.tryAgendaHebdo();
        this.pagesUI.loadCards(weekRangeDateAndCards, $dayEl);
    }

    changeDay($dayEl) {
        document.querySelectorAll(".agenda__container__header__day").forEach((day) => {
            day.classList.add("backColor");
            day.classList.remove("frontColor");
        });
        $dayEl.classList.add("frontColor");
    }

    determinateDay() {
        const $dayEl = this.pagesUI.determinateDayElement();
        return $dayEl;
    }
}