
        let tiempoPensar=5;
        const opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];
        const reglas = {
                piedra: ["tijera", "lagarto"],
                papel: ["piedra", "spock"],
                tijera: ["papel", "lagarto"],
                lagarto: ["spock", "papel"],
                spock: ["tijera", "piedra"]
            };
        const listaOpciones = document.getElementById("playerChoice");
        let jugadorEscoge;
        let ordenadorEscoge;
        const eleccionesEl = document.getElementById("elecciones");
        const resultadoEl  = document.getElementById("resultado");
        const btnReiniciar = document.getElementById("btnReiniciar");
        const ordenadorElige = document.getElementById("ordenadorElige");

        listaOpciones.addEventListener("change", function() {
            /*  ACABALO  */
          jugadorEscoge = listaOpciones.value;
          tiempoPensar = 5;
          ordenadorEscoge = undefined;
          btnReiniciar.style.display = "none";
          quienGana(jugadorEscoge, ordenadorEscoge);
          descuenta();         // el ordenador escoge tras pasar un tiempo
            /*  FIN ACABALO  */            
        });

        // decide quien gana
        function quienGana(jugador, ordenador) {
            console.log("jugador: ", jugador, " ordenador: ", ordenador);

            // Limpiar clases de veredicto previas
            resultadoEl.className = "resultado-veredicto";

            if (!jugador || !ordenador) {
                eleccionesEl.innerHTML = jugador
                    ? `Tú elegiste: <span>${jugador}</span>. Espera a que el ordenador elija.`
                    : "Elige una opción para jugar.";
                resultadoEl.textContent = "—";
                resultadoEl.classList.add("veredicto-espera");
                btnReiniciar.style.display = "none";
                return;
            }

            eleccionesEl.innerHTML = `Tú elegiste: <span>${jugador}</span> &nbsp;|&nbsp; Ordenador eligió: <span>${ordenador}</span>`;

            if (jugador === ordenador) {
                resultadoEl.textContent = "¡Empate!";
                resultadoEl.classList.add("veredicto-empate");
            } else if (reglas[jugador] && reglas[jugador].includes(ordenador)) {
                resultadoEl.textContent = "¡Ganaste!";
                resultadoEl.classList.add("veredicto-ganaste");
            } else if (reglas[ordenador] && reglas[ordenador].includes(jugador)) {
                resultadoEl.textContent = "¡Perdiste!";
                resultadoEl.classList.add("veredicto-perdiste");
            } else {
                resultadoEl.textContent = "Error en las reglas.";
                resultadoEl.classList.add("veredicto-espera");
            }

            btnReiniciar.style.display = "block";
        }

        // reinicia la partida
        function reiniciar() {
            jugadorEscoge = undefined;
            ordenadorEscoge = undefined;
            tiempoPensar = 5;
            listaOpciones.value = "";
            ordenadorElige.textContent = "Ordenador pensando elección ...";
            eleccionesEl.innerHTML = "Elige una opción para jugar.";
            resultadoEl.className = "resultado-veredicto veredicto-espera";
            resultadoEl.textContent = "—";
            btnReiniciar.style.display = "none";
        }

        //Promesa cuando pase el tiempo establecido el ordenador escoge
        function descuenta(){
            /*  ACABALO  */
            /*  FIN ACABALO  */
          ordenadorElige.textContent = `Ordenador pensando... ${tiempoPensar}`;

          const intervalo = setInterval(() => {
            tiempoPensar--;
            ordenadorElige.textContent = `Ordenador pensando... ${tiempoPensar}`;
            
            if (tiempoPensar <= 0) {
              clearInterval(intervalo);

              new Promise((resolve) => {
                setTimeout(() => {
                    const eleccion = opciones[Math.floor(Math.random() * opciones.length)];
                    resolve(eleccion);
                }, 500);
            }).then((eleccionOrdenador) => {
                ordenadorEscoge = eleccionOrdenador;
                ordenadorElige.textContent = `Ordenador eligió: ${ordenadorEscoge}`;
                quienGana(jugadorEscoge, ordenadorEscoge);
            });
        }
    }, 1000);
}

btnReiniciar.addEventListener("click", reiniciar);



