import { AgendaController } from "./classes/controllers/AgendaController.js";
import { PagesUI } from "./classes/ui/PagesUI.js";
import { MCards } from "./classes/models/MCards.js";
import { MDate } from "./classes/models/MDate.js";
import { UICards } from "./classes/ui/UICards.js";
import { UIModal } from "./classes/ui/UIModal.js";
import { MModal } from "./classes/models/MModal.js";
import { MAgenda } from "./classes/models/MAgenda.js";
import {CemetaryController} from "./classes/controllers/CemetaryController.js";

const pagesUi = new PagesUI();
const mDate = new MDate();
const mCards = new MCards(mDate);
const uiCards = new UICards();
const uiModal = new UIModal();
const mModal = new MModal();
const mAgenda = new MAgenda(mDate);

function getPageName() {
    const str = window.location.href;
    const url = new URL(str);
    const pathName = url.pathname;
    const pathNameArr = pathName.split("/");
    let page = pathNameArr[pathNameArr.length - 1];
    page = page.replace(".html", "");
    page = page.split("?")[0];
    return page;
}

const page = getPageName();

switch (page) {
    case "index":
        new AgendaController(pagesUi, mCards, mDate, uiCards, uiModal, mModal, mAgenda);
        new CemetaryController(pagesUi, mCards, mDate, uiCards, uiModal, mModal, mAgenda);
        break;

    case "":
        new AgendaController(pagesUi, mCards, mDate, uiCards, uiModal, mModal, mAgenda);
        new CemetaryController(pagesUi, mCards, mDate, uiCards, uiModal, mModal, mAgenda);
        break;


    default: throw new Error("Page introuvable");
}