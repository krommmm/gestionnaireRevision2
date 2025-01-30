export class PagesUI {
    constructor() {
        this.root = document.querySelector("#root");
        this.monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
    }

    displayAccueil() {
        this.root.innerHTML = `
                   <div class="accueil">
                <div class="accueil__header">
                    <h2>Flash cards</h2>
                    <p>Bienvenue sur l'application de flash cards</p>
                </div>
     
                <div class="accueil__main">
                    <div class="accueil__main__img"> <img src="./assets/pictures/others/leiner.png" /></div>

                    <div class="accueil__main__presentation">
                        <p class="accueil__main__presentation--title">Bienvenue sur l'application de flash Cards</p>
                        <p class="accueil__main__presentation--description">Dispositif d'apprentissage fondé sur la
                            technique de la répétition espacée.</p>
                        <p class="accueil__main__presentation--description">
                            Cette technique d'apprentissage a été mise au point dans les années 1970 par Sebastian
                            Leitner (en) (chroniqueur scientifique allemand, 1919-1989) à la suite des travaux de
                            Hermann Ebbinghaus1. </p>
                            <div class="accueil__main__presentation__footer">
                                <p>Ajouter une carte pour débuter ...</p>
                                <button class="btn-blue btn-addCard">Add card</button>
                            </div>
                    </div>
                </div>
            </div>
        `;
    }

    displayAgenda(weekRangeDateAndCards) {

        const agenda = this.createElem("div", "agenda");
        const agenda__container = this.createElem("section", "agenda__container fondColor");


        const agenda__container__header = this.createElem("div", "agenda__container__header entreColor");
        const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

        for (let i = 0; i < 7; i++) {
            const day = document.createElement("div");
            day.className = `agenda__container__header__day ${days[i]} ${weekRangeDateAndCards[i].isCurrentDay ? "frontColor" : "backColor"}`;

            const dayName = this.createElem("p", "agenda__container__header__day--day");
            dayName.textContent = days[i];
            day.appendChild(dayName);

            const date = this.createElem("span", "date");
            date.textContent = weekRangeDateAndCards[i].date[0];
            day.appendChild(date);

            const cardsLength = this.createElem("span", "cardsLength");
            cardsLength.textContent = weekRangeDateAndCards[i].cards.length;
            if (weekRangeDateAndCards[i].cards.length > 0) {
                day.appendChild(cardsLength);
            }

            agenda__container__header.appendChild(day);
        }

        const agenda__container__main = this.createElem("div", "agenda__container__main");
        const ul = this.createElem("ul", "agenda__container__main__cards");
        agenda__container__main.appendChild(ul);

        const btn = this.createElem("button", "btn-blue btn-addCard");
        btn.textContent = "Add card";
        agenda__container__main.appendChild(btn);

        agenda__container.appendChild(agenda__container__header);
        agenda__container.appendChild(agenda__container__main);
        agenda.appendChild(agenda__container);

        this.root.innerHTML = "";
        this.root.appendChild(agenda);
    }


    loadCards(weekRangeDateAndCards, $dayEl) {
        const dayClicked = $dayEl.querySelector(".agenda__container__header__day--day").textContent;
        const dayObj = weekRangeDateAndCards.filter((cell) => cell.day === dayClicked);
        const cards = dayObj[0].cards;
        const ulContainer = document.querySelector(".agenda__container__main__cards");
        ulContainer.innerHTML = "";

        for (let i = 0; i < cards.length; i++) {
            const li = this.createElem("li", "agenda__container__main__cards__li");
            li.setAttribute("data-id", cards[i].id);
            const img = this.createElem("img", "agenda__container__main__cards__img");
            img.src = `./assets/pictures/icons/${cards[i].matiere}.png`;
            const para = this.createElem("p", "agenda__container__main__cards__para");
            para.textContent = cards[i].cardName;
            li.appendChild(img);
            li.appendChild(para);
            ulContainer.appendChild(li);
        }

    }

    determinateDayElement() {
        return document.querySelector(".frontColor");
    }

    displayCemetary(ghostsCards) {
        this.cleanCemetaryElements();
        if (ghostsCards.length <= 0) {
            return;
        }
        this.displayCemetaryHeader(ghostsCards);
        this.displayCemetaryBody(ghostsCards);
        this.displayCemetaryPagination(ghostsCards);
    }

    cleanCemetaryElements() {
        const cemetaryElement = document.querySelector(".cemetary");
        const cemetaryCardsElement = document.querySelector(".cemetary__body");
        if (cemetaryElement) cemetaryElement.remove();
        if (cemetaryCardsElement) cemetaryCardsElement.remove();
    }
    getPage() {
        const str = window.location.href;
        const url = new URL(str);
        let page = parseInt(url.searchParams.get("page"));
        if (!page) {
            page = 1;
        }
        return page;
    }
    createElem(elementKind, elementClass) {
        const element = document.createElement(elementKind);
        element.className = elementClass;
        return element;
    }


    displayCemetaryHeader(ghostsCards) {
        const page = this.getPage();

        const cemetary = this.createElem("div", "cemetary");
        const cemetary__header = this.createElem("div", "cemetary__header");
        const cemetary__header__page = this.createElem("div", "cemetary__header__page");
        cemetary__header__page.textContent = page;
        const cemetary__header__img = this.createElem("div", "cemetary__header__img");
        const cemetary__header__imgContainer = this.createElem("div", "cemetary__header__img--container");
        const cemetary__header__imgImg = this.createElem("img", "cemetary__header__img--img");
        cemetary__header__imgImg.src = "./assets/pictures/others/poro_christmass.webp";
        const imgLength = this.createElem("p", "cemetary__header__img--length");
        imgLength.textContent = ghostsCards.length;
        const cemetary__header__text = this.createElem("div", "cemetary__header__text");
        const cemetary__header__textTitle = this.createElem("p", "cemetary__header__text--title");
        cemetary__header__textTitle.textContent = "Cimetière des cartes";

        cemetary__header.appendChild(cemetary__header__page);
        cemetary__header__img.appendChild(cemetary__header__imgContainer);
        cemetary__header__imgContainer.appendChild(cemetary__header__imgImg);
        cemetary__header__img.appendChild(imgLength);
        cemetary__header__text.appendChild(cemetary__header__textTitle);
        cemetary__header.appendChild(cemetary__header__page);
        cemetary__header.appendChild(cemetary__header__img);
        cemetary__header.appendChild(cemetary__header__text);
        cemetary.appendChild(cemetary__header);
        this.root.appendChild(cemetary);
    }

    displayCemetaryBody(ghostsCards) {
        //body
        const page = this.getPage();
        const cemetary = document.querySelector(".cemetary");

        const cemetary__body = this.createElem("div", "cemetary__body");
        const cemetary__body__categories = this.createElem("div", "cemetary__body__categories");
        cemetary__body.appendChild(cemetary__body__categories);

        //table
        const table = document.createElement("table");
        cemetary__body__categories.appendChild(table);
        //thead
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>step</th>
                <th>matiere</th>
                <th>name</th>
                <th>date</th>
            </tr>
        `;
        table.appendChild(thead);
        //tbody
        const tbody = document.createElement("tbody");
        let isTableFront = true;
        for (let i = ((page - 1) * 4); i < (page * 4); i++) {
            if (i + 1 > ghostsCards.length) {
                break;
            }
            const tr = document.createElement("tr");
            tr.className = isTableFront ? "tableBack" : "tableFront";
            isTableFront = !isTableFront;
            const tdStep = this.createElem("td", "tdStep");
            tdStep.textContent = ghostsCards[i].step;
            tr.appendChild(tdStep);

            const tdImg = document.createElement("td");
            const img = document.createElement("img");
            img.src = `./assets/pictures/icons/${ghostsCards[i].matiere}.png`;
            tdImg.appendChild(img);
            tr.appendChild(tdImg);

            const tdName = this.createElem("td", "tdName");
            tdName.textContent = ghostsCards[i].cardName;
            tr.appendChild(tdName);

            const tdDate = document.createElement("td");
            tdDate.textContent = `${ghostsCards[i].date[0]} ${this.monthNames[ghostsCards[i].date[1]]}  ${ghostsCards[i].date[2]}`;
            tr.appendChild(tdDate);

            const tdIcons = this.createElem("td", "tableIcons");
            tdIcons.setAttribute("data-id", ghostsCards[i].id);
            tdIcons.innerHTML = `<i class="fa-regular fa-trash-can deleteGhostCard"></i><i class="fa-solid fa-arrows-rotate resetGhostCard"></i>`;
            tr.appendChild(tdIcons);

            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        cemetary.appendChild(cemetary__body);
        this.root.appendChild(cemetary);
    }

    displayCemetaryPagination(ghostsCards) {
        const nbPages = Math.ceil(ghostsCards.length / 4);
        const cemetary = document.querySelector(".cemetary");
        const cemetary__body = document.querySelector(".cemetary__body");

        const cemetary__body__pagination = this.createElem("div", "cemetary__body__pagination");
        cemetary__body__pagination.innerHTML = `
        <div class="cemetary__body__pagination__container">
                            <div class="cemetary__body__pagination__container--square goLeft"><i class="fa-solid fa-angle-left goLeft"></i></div>
                            <div class="cemetary__body__pagination__container--numeros"></div>
                            <div class="cemetary__body__pagination__container--square goRight"><i class="fa-solid fa-angle-right goRight"></i></div>
                        </div>
        `;

        cemetary__body.appendChild(cemetary__body__pagination);

        this.root.appendChild(cemetary);
        this.root.appendChild(cemetary__body);

        const numeros = document.querySelector(".cemetary__body__pagination__container--numeros");
        const host = window.location.href.split("?")[0];
        for (let i = 0; i < nbPages; i++) {
            const a = document.createElement("a");

            a.setAttribute("href", `${host}?page=${i + 1}`);
            const numPage = this.createElem("div", "cemetary__body__pagination__container--square");
            numPage.textContent = i + 1;
            a.appendChild(numPage);
            numeros.appendChild(a);

        }
    }

}