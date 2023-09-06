//Variables
const btnEncriptar = document.querySelector('.boton-encriptar')
const btnDesencriptar = document.querySelector('.boton-desencriptar');
const btnEliminar = document.querySelector('.boton-eliminar-msjs');
const form = document.querySelector('.encriptador');

//Eventos
btnEncriptar.addEventListener('click', encriptarTexto);
btnDesencriptar.addEventListener('click', desencriptarTexto);
btnEliminar.addEventListener('click', eliminarMensajes);


//Encripta el texto que introdujimos en el textarea
function encriptarTexto(e) {
    e.preventDefault();

    const contenidoTextarea = document.querySelector('#mensaje').value;
    //Si queremos encriptar un mensaje vacío manda una alerta
    if(contenidoTextarea === '') {
        return mensajeError();
    }
    const encriptaciones = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    }

    const textEncriptado = contenidoTextarea.split('').map(letra => encriptaciones[letra] || letra).join('');

    //Llamamos la funcion que mueestra el texto con el contenido del mensaje en el HTML
    mostrarMensaje(textEncriptado);
    form.reset(); //Reseteamos formulario una vez demos clic en el botón
}


function desencriptarTexto(e) {
    e.preventDefault();

    const contenidoTextarea = document.querySelector('#mensaje').value;

    if(contenidoTextarea === '') {
        return mensajeError();
    }
    
    const desencriptaciones = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    }

    //Dividimos el contenidoTextarea encriptado en palabras separadas por espacios y almacenamos estas palabras en un arreglo
    const palabrasEncriptadas = contenidoTextarea.split(' ');

    //Utilizamos el método map para recorrer todas las palabras encriptadas
    const palabrasDesencriptadas = palabrasEncriptadas.map(palabraEncriptada => {
        //Usamos una expresión regular para buscar todas las coincidencias de las palabras encriptadas (por ejemplo, "enter", "imes", etc.) en cada palabra encriptada.
        return palabraEncriptada.replace(/(enter|imes|ai|ober|ufat)/g, match => desencriptaciones[match]);
        // match => desencriptaciones[match] realiza la sustitución, reemplazando cada palabra encriptada con la letra original correspondiente usando el objeto desencriptaciones.
    });

    //Una vez que todas las palabras encriptadas se han desencriptado, las volvemos a unir en un solo texto utilizando el método join, separadas por espacios. Esto nos da el texto desencriptado completo.
    const textoDesencriptado = palabrasDesencriptadas.join(' ');
    // console.log(textoDesencriptado);

    mostrarMensaje(textoDesencriptado);
    form.reset(); //Reseteamos formulario una vez demos clic en el botón
}   


//Crea un mensaje de error si el usauario quiere mandar un mensaje vacío
function mensajeError() {
    const form = document.querySelector('.encriptador');

    const textoError = document.createElement('P');
    textoError.textContent = 'El mensaje no puede ir vacío';
    textoError.classList.add('mensaje-vacio');
    form.appendChild(textoError);

    setTimeout(() => {
        textoError.remove();
    }, 2000);

}

function mostrarMensaje(texto) {
    //Creamos un contenedor para mostrar los mensajes en el HTML ya sean encriptados o no
    const contenedorMensajes = document.querySelector('.mensajes');

    //Creamos el parrafo que contiene el mensaje
    const textoMensaje = document.createElement('P');
    textoMensaje.classList.add('texto-mensaje');
    textoMensaje.textContent = texto;

    //Agregamos al HTML
    contenedorMensajes.appendChild(textoMensaje);

    //Si EXISTEN mensajes eliminamos el apartado no se han encontrado mensajes
    revisarMensajes();
}

// Elimina uno por uno los mensajes
function eliminarMensajes(e) {
    e.preventDefault();
    const mensaje = document.querySelector('.texto-mensaje');
    if(!mensaje) {
        console.log('no hay');
    } else {
        mensaje.remove();
        revisarMensajes();
    }
}

//Revisa si existen o no mensajes para mostrar/ocultar la seccion ningun mensaje encontrado
function revisarMensajes() {
    const seccionSinMensajes = document.querySelector('.mensajes-vacios');
    const mensaje = document.querySelector('.texto-mensaje');
    if(mensaje) {
        seccionSinMensajes.style.display = 'none';
    } else {
        seccionSinMensajes.style.display = 'block';
    }
}