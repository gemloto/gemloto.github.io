function cifrarCesar(texto, clave) {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let resultado = "";

  texto = texto.toUpperCase();

  for (let i = 0; i < texto.length; i++) {
    let letra = texto[i];

    let posicion = alfabeto.indexOf(letra);

    if (posicion === -1) {   // no está en el alfabeto
      resultado += letra;    // se deja igual (espacios, etc.)
    } else {
      let nuevaPosicion = (posicion + clave) % alfabeto.length;
      let nuevaLetra = alfabeto[nuevaPosicion];
      resultado += nuevaLetra;
    }
  }

return resultado;
}

// DOM (punto 1 teoría)
const inputFrase = document.getElementById("frase");
const inputPaso = document.getElementById("paso");
const btnCifrar = document.getElementById("btn-cifrar");
const pResultado = document.getElementById("resultado");

// Eventos (punto 3 teoría)
btnCifrar.addEventListener("click", () => {
  const texto = inputFrase.value;
  const paso = parseInt(inputPaso.value);

  if (!texto || isNaN(paso)) {
    pResultado.textContent = "Rellena la frase y el paso correctamente.";
    pResultado.classList.remove('cifrado');  // classList punto 4
    return;
  }

  const cifrado = cifrarCesar(texto, paso);
    pResultado.textContent = cifrado;
    pResultado.classList.add('cifrado');  // classList punto 4
});

// Enter (evento keypress punto 3)
inputFrase.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnCifrar.click();
});

