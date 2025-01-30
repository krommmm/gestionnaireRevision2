import { BaseController } from "./BaseController.js";

export class CemetaryController extends BaseController {
    constructor(pagesUI, mCards, mDate, uiCards, uiModal, mModal, mAgenda) {
        super();
        this.pagesUI = pagesUI;
        this.mCards = mCards;
        this.mDate = mDate;
        this.uiCards = uiCards;
        this.uiModal = uiModal;
        this.mModal = mModal;
        this.mAgenda = mAgenda;
        this.init();
    }

    init() {
        this.isCemetaryNeeded();
        this.mCards.addListener(() => this.isCemetaryNeeded()); 
        this.bindEvents();
    }

    bindEvents() {
        document.querySelector("#root").addEventListener("click", this.handleClick.bind(this));
    }

    handleClick(e) {
        if (e.target.classList.contains("deleteGhostCard")) {
            this.deleteCard(e);
        } else if (e.target.classList.contains("resetGhostCard")) {
            this.resetCard(e);
        }
    }

    async isCemetaryNeeded() {
        const ghostsCards = this.mCards.isCemetaryNeeded();
        setTimeout(() => {
            this.pagesUI.displayCemetary(ghostsCards);
        }, 30);

    }

    deleteCard(e) {
        const cardId = e.target.closest(".tableIcons").dataset.id;
        this.mCards.deleteCard(cardId);
        this.isCemetaryNeeded()
    }

    resetCard(e){
        const cardId = e.target.closest(".tableIcons").dataset.id;
        this.mCards.resetCard(cardId);
        this.isCemetaryNeeded()
    }
}