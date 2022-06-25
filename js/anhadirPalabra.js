const btnResetPalabra = getid("btn-reset");
const btnAnhadirPalabra = getid("btn-anhadir");
const anhadirPalabra = getid("anhadir-palabra");

let hayCoincidencia = false;

//reacciona con enter el anhadir Palabra
document.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        ingresarPalabra(anhadirPalabra.value);
        anhadirPalabra.value="";
    }
});

//Anhadir Palabra
btnAnhadirPalabra.addEventListener('click', function(){
    ingresarPalabra(anhadirPalabra.value);
    anhadirPalabra.value="";
});

//reiniciar palabra
btnResetPalabra.addEventListener('click', function(){
        localStorage.clear("palabrasAdicionales");
        alert("Las siguientes palabras fueron eliminadas:" + " " + palabrasAdicionales);
        location.reload();
    });


function ingresarPalabra(valor){
    if(valor.length != 0){
        verificadorAcentos(valor);
        verificadorNumeros(valor);
        verificadorLongitud(valor);
        if(hayCoincidencia==false){
            inicioCadena(valor);
        }
    }else{
        alert("No ha ingresado palabra alguna");
    }
}

//inicio de la cadena
function inicioCadena (valor){
    //transforma a mayusculas
    let texto = valor.toUpperCase();
    //verifica si está repetido
    verificarRepetidos(texto);
}

//verificar repetidos
function verificarRepetidos(texto){
    if(palabras.indexOf(texto) != -1 || palabrasAdicionales.indexOf(texto) != -1){
        alert(texto+" "+"ya fue ingresado, por favor introduzca otra palabra o modifiquela.");
    }else{
        //anhade al array
        push(texto);
    }
}

//anhade las palabras
function push(valor){
    palabras.push(valor);
    palabrasAdicionales.push(valor);
    localStorage.setItem("palabrasAdicionales", palabrasAdicionales);
}

//verificar acentos
function verificadorAcentos(texto){
    let posicion = texto.search(/á|é|í|ó|ú/g);
    if(posicion != -1){
        alert("Acento detectado. El juego no funcionará adecuadamente con un acento, por favor modifique y reingrese la frase");
        hayCoincidencia = true;
        return hayCoincidencia;
    }
    else{
        hayCoincidencia = false;
        return hayCoincidencia;
    }
}

//verificar numeros
function verificadorNumeros(texto){
    let posicion = texto.search(/0|1|2|3|4|5|6|7|8|9/g);
    if(posicion != -1){
        alert("Numero detectado. Por facilidad se le pide que no hayan números en la palabra ingresada");
        hayCoincidencia = true;
        return hayCoincidencia;
    }
    else{
        hayCoincidencia = false;
        return hayCoincidencia;
    }
}

function verificadorLongitud(texto){
    if(texto.length <= 1){
        alert("Por favor, ingrese mas de una sola letra");
        hayCoincidencia = true;
        return hayCoincidencia;
    }
    else{
        hayCoincidencia = false;
        return hayCoincidencia;
    }
}

function getid(str){
    return document.getElementById(str);
}