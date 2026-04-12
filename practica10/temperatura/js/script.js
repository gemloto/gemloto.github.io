
  // URL de la API con tu clave (sustituye 'TU_API_KEY' por tu clave real)
    const apiKey = '3bd81b97798856c1132573788610de92'; // Reemplaza con tu API key de OpenWeather';
    let titulo = document.getElementById('titulo');
    let boton=document.getElementById('boton'); 
    let inputCiudad = document.getElementById('city');
    let weather = document.getElementById('weather');


    boton.addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe
      obtenerClima();
    });

    // Detectar la tecla Enter en el campo de texto
    inputCiudad.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita que el formulario se envíe
        obtenerClima(); // Llama a la función obtenerClima()
      }
    });

    function obtenerClima() {
      const ciudad = inputCiudad.value.trim();

      if (!ciudad) {
        weather.textContent = "Escribe una ciudad";
        return;
    }

      weather.textContent = "Cargando datos...";

      //const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},ES&units=metric&appid=${apiKey}`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},ES&units=metric&appid=${apiKey}`;
      titulo.innerHTML = "Clima actual " + ciudad;
     
      // Usamos fetch para obtener los datos del clima
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos del clima: ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          // Extraemos los datos relevantes
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const humidity = data.main.humidity;

          // Mostramos los datos en el HTML
          /*  ACABALO  */
          weather.innerHTML = `
            <strong>Temperatura:</strong> ${temperature} °C <br>
            <strong>Descripción:</strong> ${description} <br>
            <strong>Humedad:</strong> ${humidity}%
          `;
          /*  FIN ACABALO  */        
        })
        .catch(error => {
          console.error('Hubo un problema:', error);
          weather.textContent = `No se pudo obtener el clima. ${error.message}`;
      });
    }
    // Llamamos a la función para obtener el clima al cargar la página
        obtenerClima();