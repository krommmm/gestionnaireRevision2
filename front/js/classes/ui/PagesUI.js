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
        const agenda = document.createElement("div");
        agenda.className = "agenda";

        const agenda__container = document.createElement("section");
        agenda__container.className = "agenda__container fondColor";

        const agenda__container__header = document.createElement("agenda__container__header");
        agenda__container__header.className = "agenda__container__header entreColor";

        const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

        for (let i = 0; i < 7; i++) {
            const day = document.createElement("div");
            day.className = `agenda__container__header__day ${days[i]} ${weekRangeDateAndCards[i].isCurrentDay ? "frontColor" : "backColor"}`;
            const dayName = document.createElement("p");
            dayName.className = "agenda__container__header__day--day";
            dayName.textContent = days[i];
            day.appendChild(dayName);

            const date = document.createElement("span");
            date.className = "date";
            date.textContent = weekRangeDateAndCards[i].date[0];
            day.appendChild(date);

            const cardsLength = document.createElement("span");
            cardsLength.className = "cardsLength";
            cardsLength.textContent = weekRangeDateAndCards[i].cards.length;
            if (weekRangeDateAndCards[i].cards.length > 0) {
                day.appendChild(cardsLength);
            }

            agenda__container__header.appendChild(day);
        }


        const agenda__container__main = document.createElement("div");
        agenda__container__main.className = "agenda__container__main";
        const ul = document.createElement("ul");
        ul.className = "agenda__container__main__cards";

        agenda__container__main.appendChild(ul);
        const btn = document.createElement("button");
        btn.className = "btn-blue btn-addCard";
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
            const li = document.createElement("li");
            li.className = "agenda__container__main__cards__li";
            li.setAttribute("data-id", cards[i].id);
            const img = document.createElement("img");
            img.className = "agenda__container__main__cards__img"
            img.src = `./assets/pictures/icons/${cards[i].matiere}.png`;
            const para = document.createElement("p");
            para.className = "agenda__container__main__cards__para";
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
        const cemetaryElement = document.querySelector(".cemetary");
        const cemetaryCardsElement = document.querySelector(".cemetary__body");
        if (cemetaryElement) cemetaryElement.remove();
        if (cemetaryCardsElement) cemetaryCardsElement.remove();

        if (ghostsCards.length <= 0) {
            return;
        }

        const str = window.location.href;
        const url = new URL(str);
        let page = parseInt(url.searchParams.get("page"));
        if (!page) {
            page = 1;
        }
        const nbPages = Math.ceil(ghostsCards.length / 4);


        //header
        const cemetary = document.createElement("div");
        cemetary.className = "cemetary";

        const cemetary__header = document.createElement("div");
        cemetary__header.className = "cemetary__header";

        const cemetary__header__page = document.createElement("div");
        cemetary__header__page.className = "cemetary__header__page";
        cemetary__header__page.textContent = page;

        const cemetary__header__img = document.createElement("div");
        cemetary__header__img.className = "cemetary__header__img";

        const cemetary__header__imgContainer = document.createElement("div");
        cemetary__header__imgContainer.className = "cemetary__header__img--container";

        const cemetary__header__imgImg = document.createElement("img");
        cemetary__header__imgImg.className = "cemetary__header__img--img";
        cemetary__header__imgImg.src = "/front/assets/pictures/others/poro_christmass.webp";

        const imgLength = document.createElement("p");
        imgLength.className = "cemetary__header__img--length";
        imgLength.textContent = ghostsCards.length;

        const cemetary__header__text = document.createElement("div");
        cemetary__header__text.className = "cemetary__header__text";

        const cemetary__header__textTitle = document.createElement("p");
        cemetary__header__textTitle.className = "cemetary__header__text--title";
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

        //body
        const cemetary__body = document.createElement("div");
        cemetary__body.className = "cemetary__body";

        const cemetary__body__categories = document.createElement("div");
        cemetary__body__categories.className = "cemetary__body__categories";
        cemetary__body.appendChild(cemetary__body__categories);

        const table = document.createElement("table");
        cemetary__body__categories.appendChild(table);

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

        const tbody = document.createElement("tbody");
        let isTableFront = true;
        for (let i = ((page - 1) * 4); i < (page * 4); i++) {
            if (i+1>ghostsCards.length) {
                break;
            }
            const tr = document.createElement("tr");
            tr.className = isTableFront ? "tableBack" : "tableFront";
            isTableFront = !isTableFront;
            const tdStep = document.createElement("td");
            tdStep.className = "tdStep";
            tdStep.textContent = ghostsCards[i].step;
            tr.appendChild(tdStep);

            const tdImg = document.createElement("td");
            const img = document.createElement("img");
            img.src = `/front/assets/pictures/icons/${ghostsCards[i].matiere}.png`;
            tdImg.appendChild(img);
            tr.appendChild(tdImg);

            const tdName = document.createElement("td");
            tdName.textContent = ghostsCards[i].cardName;
            tdName.className = "tdName";
            tr.appendChild(tdName);

            const tdDate = document.createElement("td");
            tdDate.textContent = `${ghostsCards[i].date[0]} ${this.monthNames[ghostsCards[i].date[1]]}  ${ghostsCards[i].date[2]}`;
            tr.appendChild(tdDate);

            const tdIcons = document.createElement("td");
            tdIcons.className = "tableIcons";
            tdIcons.setAttribute("data-id", ghostsCards[i].id);
            tdIcons.innerHTML = `<i class="fa-regular fa-trash-can deleteGhostCard"></i><i class="fa-solid fa-arrows-rotate resetGhostCard"></i>`;
            tr.appendChild(tdIcons);

            tbody.appendChild(tr);
        }
        // for (let i = 0; i < ghostsCards.length; i++) {
        //     const tr = document.createElement("tr");
        //     tr.className = isTableFront ? "tableBack" : "tableFront";
        //     isTableFront = !isTableFront;
        //     const tdStep = document.createElement("td");
        //     tdStep.className = "tdStep";
        //     tdStep.textContent = ghostsCards[i].step;
        //     tr.appendChild(tdStep);

        //     const tdImg = document.createElement("td");
        //     const img = document.createElement("img");
        //     img.src = `/front/assets/pictures/icons/${ghostsCards[i].matiere}.png`;
        //     tdImg.appendChild(img);
        //     tr.appendChild(tdImg);

        //     const tdName = document.createElement("td");
        //     tdName.textContent = ghostsCards[i].cardName;
        //     tdName.className = "tdName";
        //     tr.appendChild(tdName);

        //     const tdDate = document.createElement("td");
        //     tdDate.textContent = `${ghostsCards[i].date[0]} ${this.monthNames[ghostsCards[i].date[1]]}  ${ghostsCards[i].date[2]}`;
        //     tr.appendChild(tdDate);

        //     const tdIcons = document.createElement("td");
        //     tdIcons.className = "tableIcons";
        //     tdIcons.setAttribute("data-id", ghostsCards[i].id);
        //     tdIcons.innerHTML = `<i class="fa-regular fa-trash-can deleteGhostCard"></i><i class="fa-solid fa-arrows-rotate resetGhostCard"></i>`;
        //     tr.appendChild(tdIcons);

        //     tbody.appendChild(tr);
        // }
        table.appendChild(tbody);

        // Pagination
        const cemetary__body__pagination = document.createElement("div");
        cemetary__body__pagination.className = "cemetary__body__pagination";
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
            const numPage = document.createElement("div");
            numPage.className = "cemetary__body__pagination__container--square";
            numPage.textContent = i + 1;
            a.appendChild(numPage);
            numeros.appendChild(a);

        }
    }
}