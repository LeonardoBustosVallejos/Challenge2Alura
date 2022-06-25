//menu
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const palabrasAnhadidas = document.querySelectorAll(".li-palabras-anhadidas");
const palabrasContainer = document.querySelector(".ul-palabras-anhadidas");

navToggle.addEventListener("click", ()=>{
    navMenu.classList.toggle("nav-menu_visible");
});

//palabras
let palabras = ["PARALELEPIPEDO",
                "ESTERNOCLEIDOMASTOIDEO",
                "ARROJAR",
                "CRIATURAS",
                "SINFONIA",
                "CALAMARDO",
                "MAQUETACION",
                "JAVASCRIPT",
                "HTML",
                "HOLAMUNDO"];
let palabrasAdicionales = [];


//carga las palabras guardadas al iniciarse la página
document.addEventListener("DOMContentLoaded", function(){
    let palabrasGuardadas = localStorage.getItem("palabrasAdicionales");
    let palabrasCargadas = palabrasGuardadas.split(',');
    palabrasAdicionales = palabrasCargadas;
    localStorage.setItem("palabrasAdicionales", palabrasCargadas);
    let palabrasIniciadas = palabras.concat(palabrasAdicionales);
    palabras = palabrasIniciadas;
});

function random(numMinimo, numMaximo){
    const amplitudValores = numMaximo - numMinimo;

    valorAleatorio = Math.floor(Math.random() * amplitudValores) + numMinimo;
    return valorAleatorio;
}

function setStart(errores){

    removerSpansUsados();
    setContador(errores)
    setMunheco(errores);
    revelar(btnDesistir);
    revelar(btnIngresar);
    revelar(inputtxt);
    revelar(parrafoIntentos);
    revelar(palabraSecreta);
    revelar(instructivo);
    ocultar(btnIniciar);
    ocultar(resultadoAhorcado);
}

function gameOver(){
    ocultar(inputtxt);
    ocultar(btnDesistir);
    ocultar(btnIngresar);
    ocultar(instructivo);
    revelar(btnIniciar);
}

function getid(str){
    return document.getElementById(str);
}

function ocultar(element){
    element.classList.add("ocultar");
}

function revelar(element){
    element.classList.remove("ocultar");
}

function upperCase(txt){
    var txtUpper = txt.toUpperCase();{
    return txtUpper;
    }
}