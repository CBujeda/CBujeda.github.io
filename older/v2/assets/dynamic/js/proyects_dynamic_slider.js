

// Función para cargar el JSON y construir el carrusel
  function loadCarouselFromJSON() {
    var jsonPath = primaryPath+'dynamic/json/proyects_data.json';

    fetch(jsonPath)
      .then(response => response.json())
      .then(data => createCarouselItems(data))
      .catch(error => console.error('Error fetching JSON, PATH:' + jsonPath + " [ ERROR ]:", error));
  }

  // Función para crear elementos de carrusel y agregarlos al DOM
  function createCarouselItems(data) {
    const carouselContent = document.getElementById("carouselContent");
    carouselContent.setAttribute("data-bs-interval", time_interval); // Agregar la propiedad data-bs-interval
    data.forEach((item, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      const img = document.createElement("img");
      img.classList.add("d-block", "w-100");
      img.src = primaryIMGPath + item.imgSrc;
      img.alt = "...";

      const caption = document.createElement("div");
      caption.classList.add("carousel-caption", "d-none", "d-md-block", "text-light", "text-start", "text_Shadow");

      const title = document.createElement("h3");
      title.textContent = item.title;

      const description = document.createElement("p");
      const boldText = document.createElement("b");
      boldText.textContent = item.description + " ";
      const link = document.createElement("a");
      link.href = "./pages/" + item.link;
      link.textContent = "Ver";
      boldText.appendChild(link);
      description.appendChild(boldText);

      caption.appendChild(title);
      caption.appendChild(description);

      carouselItem.appendChild(img);
      carouselItem.appendChild(caption);

      carouselContent.appendChild(carouselItem);
    });
  }

  //data-bs-interval="10000"

  // Llamar a la función para cargar el carrusel desde el JSON
  loadCarouselFromJSON();