export class BaseController {
    constructor() {
        this.initBase();
    }

    initBase() {
        this.bindCommonEvents();
    }

    bindCommonEvents() { 
        document.querySelector(".magicStorage").addEventListener("click",this.handleMagicStorage.bind(this));
        document.querySelector("#formSearchBar").addEventListener("submit",this.handleSubmitHeaderForm.bind(this));
        
    }

    handleSubmitHeaderForm(e){
        e.preventDefault();
        const form = e.target;
        form.reset();
    }


    handleMagicStorage(e){
        e.preventDefault();
        const magicCards = [
            {
              "cardName": "Introduction au JavaScript",
              "matiere": "js_icon",
              "date": [5, 0, 2025],
              "step": 1,
              "id": 18
            },
            {
              "cardName": "Bases de Python : Variables et Boucles",
              "matiere": "python_icon",
              "date": [7, 0, 2025],
              "step": 1,
              "id": 19
            },
            {
              "cardName": "Installation et Commandes de base Debian",
              "matiere": "debian_icon",
              "date": [15, 0, 2025],
              "step": 3,
              "id": 21
            },
            {
              "cardName": "Fonctions et Classes en PHP",
              "matiere": "php_icon",
              "date": [20, 0, 2025],
              "step": 1,
              "id": 22
            },
            {
              "cardName": "Manipulation du DOM en JavaScript",
              "matiere": "js_icon",
              "date": [25, 0, 2025],
              "step": 1,
              "id": 23
            },
            {
              "cardName": "Création d'un Serveur avec Node.js",
              "matiere": "nodejs_icon",
              "date": [26, 0, 2025],
              "step": 1,
              "id": 24
            },
            {
              "cardName": "Tests Unitaires avec Jest",
              "matiere": "jest_icon",
              "date": [27, 0, 2025],
              "step": 1,
              "id": 25
            },
            {
              "cardName": "Gestion de Bases de Données en PHP",
              "matiere": "php_icon",
              "date": [28, 0, 2025],
              "step": 1,
              "id": 26
            },
            {
              "cardName": "Middleware et API avec Node.js",
              "matiere": "nodejs_icon",
              "date": [28, 0, 2025],
              "step": 1,
              "id": 27
            }
          ]
          

        localStorage.setItem("flash-cards-tb", JSON.stringify(magicCards));
        localStorage.setItem("flash-cards-tb-id", JSON.stringify(9));
        window.location.reload();
    }
}