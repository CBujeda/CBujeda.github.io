// Función para cargar el JSON y generar las cards
function generateCardsFromJSON() {
    fetch(primaryPath + 'dynamic/json/proyects_data.json')
        .then(response => response.json())
        .then(data => createCards(data))
        .catch(error => console.error('Error fetching JSON:', error));
}

// Función para crear las cards y agregarlas al DOM
function createCards(data) {
    const cardContainer = document.getElementById("cardContainer");

    data.forEach(item => {
        const col = document.createElement("div");
        col.classList.add("col-3", "mt-2", "mb-5");

        const card = document.createElement("div");
        card.classList.add("card", "border-0", "cards-gradient", "card-styles");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = primaryIMGPath + item.imgSrc;
        img.alt = "...";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title", "text_Shadow");
        title.textContent = item.title;

        const tipo_Clase = document.createElement("span");
        tipo_Clase.classList.add("card-text", "text_Shadow");
        tipo_Clase.textContent = item.clase;

        /*
        const description = document.createElement("span");
        description.classList.add("card-text", "text_Shadow");
        description.textContent = item.description;
        */
        const largeDescription = document.createElement("span");
        largeDescription.classList.add("card-text", "text_Shadow");
        // Limitar la descripción larga a 85 caracteres
        largeDescription.textContent = item.large_description.length > size_description ? item.large_description.slice(0, size_description) + "..." : item.large_description;

        const link = document.createElement("a");
        link.href =  "./pages/" + item.link;
        link.classList.add("btn", "card-btn", "text_Shadow");
        link.textContent = "Ver";

        const textEnd = document.createElement("div");
        textEnd.classList.add("text-end");
        textEnd.appendChild(link);

        cardBody.appendChild(title);
        cardBody.appendChild(tipo_Clase);
        cardBody.appendChild(document.createElement("br"));
        //cardBody.appendChild(description);
        //cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(largeDescription);
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(textEnd);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        cardContainer.appendChild(col);
    });
}

// Llamar a la función para generar las cards desde el JSON
generateCardsFromJSON();
