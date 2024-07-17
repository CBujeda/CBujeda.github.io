const educationImgLogo = "./assets/static/img/inicio/education_logos/";



document.addEventListener("DOMContentLoaded", function() {
    fetch("./assets/dynamic/json/educationTimeLine.json")
      .then(response => response.json())
      .then(data => {
        const timeline = document.getElementById("timeline");
        const groupedData = groupByYear(data);
        
        groupedData.forEach(group => {
          const yearContainer = document.createElement("div");
          yearContainer.classList.add("year-container");
          
          const yearHeader = document.createElement("h5");
          yearHeader.textContent = group.year;
          yearContainer.appendChild(yearHeader);
          
          group.events.forEach(item => {
            const timelineItem = document.createElement("div");
            timelineItem.classList.add("timeline-item");
            
            const startDate = new Date(item.start_date);
            const endDate = item.end_date ? new Date(item.end_date) : new Date();
            
            timelineItem.innerHTML = `
            <table>
            <tbody>
            <tr>
            <td>${item.image ? `<img src="${ educationImgLogo + item.image}" alt="${item.title}">` : ''}</td>
            <td>
            <h5>${item.title}</h5>
            <p>${formatDate(endDate)} - ${formatDate(startDate)} </p>
            <p>${item.description}</p>
            </td>
            </tr>
            </tbody>
            </table>

              
            `;
            yearContainer.appendChild(timelineItem);
          });
          
          timeline.appendChild(yearContainer);
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });
  
  function groupByYear(data) {
    const grouped = {};
    
    data.forEach(item => {
      const year = new Date(item.start_date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(item);
    });
  
    // Ordenar los años de forma inversa
    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
    
    return sortedYears.map(year => ({
      year,
      events: grouped[year]
    }));
  }
  
  function formatDate(date) {
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  }
  