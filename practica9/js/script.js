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

// DOM
const inputFrase = document.getElementById("frase");
const inputPaso = document.getElementById("paso");
const btnCifrar = document.getElementById("btn-cifrar");
const pResultado = document.getElementById("resultado");

btnCifrar.addEventListener("click", () => {
  const texto = inputFrase.value;
  const paso = parseInt(inputPaso.value);

  if (!texto || isNaN(paso)) {
    pResultado.textContent = "Rellena la frase y el paso correctamente.";
    return;
  }

  const cifrado = cifrarCesar(texto, paso);
  pResultado.textContent = cifrado;
});

