module.exports = function (eleventyConfig){

    // Hay que pasale las carpetas que contienen recursos
    eleventyConfig.addPassthroughCopy("src/assets/css")
    eleventyConfig.addPassthroughCopy("src/assets/js")
    eleventyConfig.addPassthroughCopy("src/assets/img")
    eleventyConfig.addPassthroughCopy("src/assets/download")



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