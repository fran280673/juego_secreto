let numeroSecreto = 0;
let intentos = 0; 
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// nota: con control + f puedo buscar un dato en todo el código

console.log(numeroSecreto);



// En javascript cuando hay funciones declaradas, las lee primero antes de cualquier otra linea y las deja en el...
// ...almacenamiento de la memoria, por lo que no es necesario llamarlas para que...
// ...se ejecuten, solo se ejecutan cuando haga falta llamarlas.
    function asignarTextoElemento(elemento, texto){
        let elementoHTML = document.querySelector(elemento); // Ha través del DOM (Document Object Model), podemos conectar elementos de javascript con nuestro HTML
    // querySelector es un método que devuelve el primer elemento dentro del documento que coincide con el grupo especifico...
    // de selectores. Si no hay un elemento que coincida, devuelve null.
    // Lo que estamos haciendo es traernos h1 del html a javascript y asignandolo a una variable llamada elementoHTML,...
    //... para poder trabajar con el h1.
        elementoHTML.innerHTML = texto; // Con innerHTML le podemos poner un título al juego 
        return; // Aunque ésta función no retorna nada, es buena practica poner return.
    }

    function verificarIntento() { // En html hacemos el llamamiento de ésta función
        let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);// Con getElementById, lo que hacemos...
                                   //... es traer el valor del input que tiene el id valorUsuario del html. Como el...
                                   //... valor que nos da es un string, lo convertimos a un número con parseInt.
        
        if (numeroDeUsuario === numeroSecreto){ // Esto lo que va hacer es comparar si coincide...
                                //... el numeroDeUsuario con el numeroSecreto, y si es el mismo tipo de dato...
                                //...Nos retornará True se cumple los dos requisitos, sino retornará False.
            asignarTextoElemento("p",`Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}`);// En el párrafo Indica un numero del 1 al 10,...
                                //... si el usuario acierta, cambiarlo por Acertaste el número. Y con el operador ternario...
                                //... le indicamos que si el intento es 1, ponga vez, sino ponga veces, que va metido en un...
                                //... template string.
            document.getElementById("reiniciar").removeAttribute("disabled");// Con ésto lo que hacemos es habilitar...
                                         //... el botón reiniciar, para que el usuario pueda volver a jugar.
        } else {
            // El usuario no acertó
           if (numeroDeUsuario > numeroSecreto) { 
            asignarTextoElemento("p","El número secreto es menor");
            } else {
                asignarTextoElemento("p","El número secreto es mayor");
            }
            intentos++; // para que me diga en cuantos intentos acertó el usuario 
            limpiarCaja();              
        }
        return;
    }

    //creamos la funcioon para limpiar la caja

    function limpiarCaja(){
        document.querySelector("#valorUsuario").value = ""; // Con value le estamos diciendo que el valor de la caja se vacíe cuando no...
                                             //... he acertado en adivinar el número
    }

    function generarNumeroSecreto() {
        let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

        console.log(numeroGenerado);
        console.log(listaNumerosSorteados);
        //si ya sorteamos todos los numeros
        if (listaNumerosSorteados.length == numeroMaximo) {//si ya hemos jugado con todos los números (del 1 al 10) y al generar un...
                                   //...nuevo número, ya no hay más números para jugar porque se repite, entonces sale un mensaje "Ya se...
                                   //...ha jugado con todos los números posibles", y se reinicia el juego dando un F5
             asignarTextoElemento("p", "Ya se ha jugado con todos los números posibles");

        } else {

            //Si el numero generado está incluido en la lista
            if (listaNumerosSorteados.includes(numeroGenerado)) {//si el numero generado está en la lista, haremos lo siguiente
                return generarNumeroSecreto();//Si está en la lista, lo que hace la recursividad es que la función se llama...
                                            //...a sí misma, hasta que no esté en la lista, y cuando no esta en la lista...
                                            //... se ejecuta el código que hay dentro de la función, generando otro número, ...
                                            //... que si no está en la lista, se pasa al siguiente bloque (else).

            } else {
                listaNumerosSorteados.push(numeroGenerado);//con el método push metemos el número generado ya jugado para que no vuelva a salir en el siguiente juego
                return numeroGenerado;

            }
        }
    }

    function condicionesIniciales(){
        // Con lo de abajo, lo que hago es llamar a la función.
        // Con una sola funcion podemos hacer lo que dice esa funcion en varios elementos
        asignarTextoElemento("h1","Juego del número secreto!");
        asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
        numeroSecreto = generarNumeroSecreto();
        intentos = 1;

    }

    //construimos la funciona para reiniciar el juego

    function reiniciarJuego(){
        //Limpiar caja
        limpiarCaja();
        //Indicar mensaje de intervalo de números
        //Generar el número aleatorio
        //Inicializar el número intentos
        condicionesIniciales();
        //Deshabilitar el boton de nuevo juego una vez que se ha reiniciado el juego
        document.querySelector("#reiniciar").setAttribute("disabled","true");
    }

    condicionesIniciales();
