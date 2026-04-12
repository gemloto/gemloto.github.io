
        let moneda="EUR"
        //let moneda="USD"
        let url=`https://api.frankfurter.dev/v1/latest?base=${moneda}`

        let cantidad=document.getElementById("cantidad")
        let convertirBtn=document.getElementById("convertir")
        let resultado=document.getElementById("resultado")

        //funciones
        /*
            Devuelve un li con los datos de la moneda
        */
            /*  ACABALO  */
          function creaElemento(valor, clave) {            
            let total= Math.round(parseFloat(cantidad.value)*parseFloat(valor)*100)/ 100
            //let liElement ....
            let liElement = document.createElement("li");
            liElement.textContent = `${cantidad.value} ${moneda} = ${total} ${clave}`;
            /*  FIN ACABALO  */
            return liElement
        }

        
        /*
            Obtiene los cambios y los pinta en pantalla 
        */
        async function convertir(){        
            //resultado.innerHTML=`1 ${moneda} = ${datos["rates"][moneda]} USD`
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    // haz cosas con los datos        
                    console.log(datos);

                    let cambios=Object.entries(datos.rates);
                    let ulElement = document.createElement("ul");

                    cambios.forEach(([clave, valor]) => {
                        console.log(clave, valor);
                        /*  ACABALO  */
                        //usa creaElemento(valor, clave)
                        /*  FIN ACABALO  */    
                        let liElement = creaElemento(valor, clave);
                        ulElement.appendChild(liElement);
                    });

                    resultado.appendChild(ulElement);
            })
                .catch(error => console.log(error));                        
        }
        //eventos
        convertirBtn.addEventListener("click", function(){
            resultado.innerHTML=""
            convertir()
        })