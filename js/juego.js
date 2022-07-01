const btnIniciar = getid("btn-iniciar");
const btnDesistir = getid("btn-desistir");
const btnIngresar = getid("btn-ingresar");
const inputtxt = getid("input-txt");
const instructivo = getid("instructivo");
const parrafoIntentos = getid("intentos-restantes")
const palabraSecreta = document.querySelector(".div-palabra-secreta");
const erroresCount = getid("errores-count");
const letrasErradas = getid("letras-erradas");
const resultadoAhorcado = getid("resultado-ahorcado");
const letrasUsadasSpan = getid('letras-erradas');

let coincidencia = false;
let rendirse = false
let acerto = false;
let intentosRestantes = 9;
let aciertos = 0;
let errores = 0;
let posicionPalabraSecreta;

let inputAnhadidos = [];

//evita que se recarge la pagina al presionar enter
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
    if(e.keyCode == 13) {
        e.preventDefault();
    }
    }))
});

//click en iniciar
btnIniciar.addEventListener('click', ()=>{
    rendirse = false;
    aciertos = 0;
    errores = 0;
    intentosRestantes = 9;
    inputAnhadidos = [];
    setStart(errores);

    iniciarJuego();
});


//click en btn ingresar letra
btnIngresar.addEventListener('click', ()=>{
    acerto = false;

    const texto = upperCase(inputtxt.value);

    validarInput(texto);

    if(coincidencia == false){
        comprobarLetra(texto);
    }
    else{
        console.log("coincidencia = true");
    }

    inputtxt.value = "";
});

//btn rendirse
btnDesistir.addEventListener('click', ()=>{
    rendirse = true
    errores = 9;

    setMunheco(errores);
    intentosTerminados();
});


function iniciarJuego(){
    const parrafo = getid('palabra-secreta');
    parrafo.innerHTML = '';

    const numeroPalabras = palabras.length;

    const valorMinimo = 0;
    const valorAleatorio = random(valorMinimo, numeroPalabras);

    posicionPalabraSecreta = palabras[valorAleatorio];

    const cantidadLetras = posicionPalabraSecreta.length;
    
    console.log(posicionPalabraSecreta);

    for(let i = 0; i < cantidadLetras; i++){
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }

    return posicionPalabraSecreta;
}

function validarInput (texto){
    verificarExistencia(texto);
    verificarSimbolo(texto);
}

function verificarExistencia(texto){
    if(texto == ""||  texto == " "){
        
        coincidencia = true;
        return coincidencia
    }
    else{

        coincidencia = false
        return coincidencia;
    }
}



function verificarSimbolo(texto){
    let posicion = texto.search(/A|B|C|D|E|F|G|H|I|J|K|L|M|N|Ñ|O|P|Q|R|S|T|U|V|W|X|Y|Z/g);

    if(posicion == -1){

        coincidencia = true;
        return coincidencia
    }
    else{
        letrasAnhadidas(texto);
        coincidencia = false;

        return coincidencia;
    }
}

function comprobarLetra(input){
    const letrasSpan = document.querySelectorAll('#palabra-secreta span');
    letrasSpan.innerHTML = '';

    const texto = upperCase(input);

    for(let i = 0; i < posicionPalabraSecreta.length; i++){
        if(texto == posicionPalabraSecreta[i]){
            letrasSpan[i].innerHTML = texto;
            aciertos++;
            acerto = true;

            if(aciertos == posicionPalabraSecreta.length){
                resultadoAhorcado.innerHTML = "¡FELICIDADES HAS GANADO!";
                revelar(resultadoAhorcado);
                gameOver();
            }
        }
    }

    if(acerto == false|| rendirse == true){
        errores++;
        setContador(errores);
        setMunheco(errores);

        if(intentosRestantes == 0){
            intentosTerminados();
        }
    }
}

function intentosTerminados(){
    resultadoAhorcado.innerHTML = "Que pena, has perdido =( la palabra era: " + posicionPalabraSecreta;
    revelar(resultadoAhorcado);
    gameOver();
}

function setContador(errores){
    erroresCount.innerHTML = 9 - errores;
    intentosRestantes = 9 - errores;
}

function setMunheco(errores){
    const source = `images/ahorcado${errores}.png`;
    const imagen = getid('img-ahorcado');

    imagen.src = source;
}

function letrasAnhadidas(input){
    inputAnhadidos.push(input);

    const usadas = document.createElement('span');
    usadas.innerHTML = input;
    letrasUsadasSpan.appendChild(usadas);
}

function removerSpansUsados(){
    while(letrasUsadasSpan.hasChildNodes()){
        letrasUsadasSpan.removeChild(letrasUsadasSpan.firstChild)
    }
}