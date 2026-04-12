    //variables
    //moneda
    let moneda = "EUR";
    // criptos
    let lista= ["BTC", "ETH", "SOL", "DOGE"];

    let cantidad = document.getElementById("cantidad");
    let convertirBtn = document.getElementById("convertir");
    let resultados = document.getElementById("resultados");
    let error = document.getElementById("error");

    
    /*
      Devuelve un li con los datos de la moneda
    */
    function creaElemento(cripto,cambio,cantidad) {    
      /*  ACABALO  */        
      let total = Math.round((parseFloat(cantidad) / parseFloat(cambio)) * 100000000) / 100000000; 
       //let liElement ...
      let liElement = document.createElement("li");
      liElement.textContent = `${cantidad} ${moneda} = ${total} ${cripto}`;
      /*  FIN ACABALO  */
      return liElement
    }
    
/*
  Obtiene los cambios y los pinta en pantalla
*/
    async function convertir() {
      error.textContent = "";
      resultados.innerHTML = "";
      
      // cuanto dinero
      const valor = parseFloat(cantidad.value);
      
      //errores
      if (isNaN(valor) || valor <= 0) {
        error.textContent = "Introduce una cantidad válida";
        return;
      }


      // pido el precio de cada cripto
      let ulElement = document.createElement("ul");

      // esta api solo permite 1 moneda cada vez por eso el bucle
      lista.forEach((cripto) => {
        let url = `https://api.coinbase.com/v2/prices/${cripto}-${moneda}/spot`;

        fetch(url)
          .then(response => response.json())
          .then(datos => {
            /*  ACABALO  */
            // haz cosas con los datos                
            let cambio=datos.data.amount;
            console.log("==>"+cambio);
            //usa creaElemento(cripto,cambio,cantidad)
            let liElement = creaElemento(cripto, cambio, valor);
            ulElement.appendChild(liElement);
            /*  FIN ACABALO  */    
        })
        .catch(e => {
          console.log("ERROR: " + e)
          error.textContent = "Error al obtener los datos"
        });       
    })
    resultados.appendChild(ulElement);
    }

    //eventos
    convertirBtn.addEventListener("click", () => {
      console.log("click")
      convertir()
    });

    //main
