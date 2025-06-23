module.exports = function (eleventyConfig){

    // Hay que pasale las carpetas que contienen recursos
    eleventyConfig.addPassthroughCopy("src/assets/css")
    eleventyConfig.addPassthroughCopy("src/assets/js")
    eleventyConfig.addPassthroughCopy("src/assets/img")
    eleventyConfig.addPassthroughCopy("src/assets/download")


    eleventyConfig.addNunjucksFilter("padStart", function(str, targetLength, padString) {
      return String(str).padStart(targetLength, padString);
    });
      // Colección de archivos por mes y año
    eleventyConfig.addCollection("archives", function(collectionApi) {
      const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const archiveMap = new Map();
      collectionApi.getFilteredByGlob("src/blog/posts/*.md").forEach(post => {
        const date = new Date(post.date);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-indexed
        const key = `${year}-${month}`;
        if (!archiveMap.has(key)) {
          archiveMap.set(key, {
            year,
            month,
            monthName: months[month],
            count: 1
          });
        } else {
          archiveMap.get(key).count++;
        }
      });
      // Ordena del más reciente al más antiguo
      return Array.from(archiveMap.values()).sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
    });

    // Colección de categorías únicas
    eleventyConfig.addCollection("categories", function(collectionApi) {
    const categoriesSet = new Set();
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => categoriesSet.add(tag));
      }
    });
    return [...categoriesSet].sort();
  });

  // Añade una colección para los posts del blog
  // Esto hará que todos los archivos en blog/posts/ sean accesibles como `collections.blogPosts`
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => {
      // Ordena los posts por fecha, del más nuevo al más antiguo
      return b.date - a.date;
    });
  });

  // Filtro Nunjucks personalizado para ordenar la colección por el año de inicio.
  // Es robusto para manejar formatos como 'YYYY' o 'YYYY-Actualidad'.
  eleventyConfig.addNunjucksFilter("sortByStartDate", function(collection) {
    if (!collection) {
      return [];
    }

    // Crea una copia de la colección para no modificar el objeto original.
    return [...collection].sort((a, b) => {
      // Función auxiliar para extraer el año de inicio.
      const getStartYear = (dateString) => {
        // Asume que el año de inicio siempre es la primera parte antes del primer '-'
        // o la cadena completa si no hay '-'.
        const parts = dateString.split('-');
        return parseInt(parts[0]);
      };

      const yearA = getStartYear(a.date);
      const yearB = getStartYear(b.date);

      // Ordena de forma ascendente (del año más antiguo al más reciente).
      return yearA - yearB;
    });
  });


    return {
        dir:{
            input:  "src",
            output: "docs"
        },
    };
};