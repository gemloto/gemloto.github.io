//variables  - Punto 1 DOM
let botonAnyadir=document.getElementById("botonAnyadir")
let panel=document.getElementById("panel")
let nombre=document.getElementById("nombre")
let solucion=document.getElementById("solucion")
let botonResuelve=document.getElementById("botonResuelve")

let amigos=[]
let solucionClientes = new Map()

// PUNTO 5: funciones anónima y flecha
const unoMas = function(nombre) {
    amigos.push(nombre)
}
const otroMas = (nombre) => {
    amigos.push(nombre)
}

// //funciones
// function render(){
//     console.log("AMIGOS: "+amigos)
//     //console.log("CLIENTES: "+clientes)
//     panel.innerHTML=""
//     amigos.forEach((amigo)=>{
//         console.log(amigo)
//         panel.innerHTML+=`<input type='button' value='Borrar' data-id='${amigo}'>`+amigo+"<BR>"
//     })
// }


//funciones 
// PUNTOS 4+6: render con forEach + data-action/data-id
function render(){
    console.log("AMIGOS: "+amigos)
    const elementos = document.createElement('ul')
    panel.innerHTML=""
    amigos.forEach((amigo, indice) => {    // PUNTO 4: forEach
        console.log(amigo)
        let amigoLi = document.createElement('li')
        let button = document.createElement('input')
        let textoLi = document.createElement('span')
        button.type='button'
        button.dataset.id = amigo            // PUNTO 6: data-id='nombre'  
        button.dataset.action = 'borrar'        // PUNTO 6: data-action='borrar'
        button.value='Borrar'        // PUNTO 6: value='Borrar'                 
        textoLi.innerHTML=amigo
        amigoLi.append(button)
        amigoLi.append(textoLi)
        elementos.append(amigoLi)
    })
    panel.append(elementos)
}

//funciones
function renderSolucion(){
    console.log("AMIGOS: "+amigos)
    solucion.innerHTML=""
    //console.log("CLIENTES: "+clientes)
    solucionClientes.forEach((value, key) => {
        solucion.innerHTML+=  `${value} --> ${key}`+"<br>"
    })
}


function borraAmigo(nombre){
    let indice=amigos.indexOf(nombre)
    if (indice !== -1) {  // Seguridad extra
        amigos.splice(indice,1)
    }
    render()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/*
    devuelve false si el último se asigna a si mismo
*/
function reparto(){
    if (amigos.length < 3) {  // Mínimo 3 para ciclo válido
        return false;
    }
    
    let esCorrecto = false;
    let intentosMax = 1000;
    
    for (let intento = 0; intento < intentosMax; intento++) {
        let disponibles = [...amigos];  // PUNTO 8: SPREAD
        solucionClientes.clear();
        let tempAsignacion = new Map();
        
        // Generar permutación aleatoria (Fisher-Yates shuffle simplificado)
        for (let i = disponibles.length - 1; i > 0; i--) {
            let j = aleatorio(0, i);
            [disponibles[i], disponibles[j]] = [disponibles[j], disponibles[i]];
        }
        
        // Asignar: cada uno regala al siguiente en la permutación
        esCorrecto = true;
        for (let i = 0; i < amigos.length; i++) {
            let dador = amigos[i];
            let receptor = disponibles[i];
            
            if (dador === receptor) {
                esCorrecto = false;
                break;
            }
            
            tempAsignacion.set(receptor, dador);
        }
        
        if (esCorrecto) {
            solucionClientes = tempAsignacion;
            return true;
        }
    }
    
    return false;  // Falló tras muchos intentos
}

//eventos
botonAnyadir.addEventListener("click",(e) => {
    e.preventDefault()
    // PUNTO 7: SET - AÑADIR
    let setAmigos = new Set(amigos)
    if (setAmigos.has(nombre.value.trim())) {
        alert("Amigo repetido")
        return
    }

    amigos.push(nombre.value.trim())
    nombre.value = ""
    render()
})

panel.addEventListener("click", (e)=>{
    if (e.target.dataset.action == "borrar") {
        let id = e.target.dataset.id
        borraAmigo(id)  
        solucion.innerHTML = ""               
    }
})

botonResuelve.addEventListener("click", (e)=>{
    console.log("Voy a resolver ")
    let correcto = reparto()
    let intentos = 0
    while (!correcto && intentos < 100){
        console.log("El mapa no acabó correctamente.")
        correcto = reparto()
        intentos++
    }
    
    renderSolucion()
})