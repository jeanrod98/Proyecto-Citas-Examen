//Variables del formulario
const formulario = document.getElementById('formulario-registro');
const inputs = document.querySelectorAll('#formulario-registro input');

//Expresiones regulares para validacion
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,20}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,30}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/, // 7 a 14 numeros.
    cedula: /^\d{10}$/
}

//Objeto identificador de validaxion

const campos = {
    nombre: false,
    apellido: false,
    usuario: false,
    contrasenia: false,
    correo: false,
    telefono: false,
    cedula: false
}
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, e.target.name);
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, e.target.name);
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, e.target.name);
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, e.target.name);
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, e.target.name);
            break;
        case "contrasenia":
            validarCampo(expresiones.password, e.target, e.target.name);
            validarContraseña2();
            break;
        case "contrasenia2":
            validarContraseña2();
            break;
        case "cedula":
            validarCampo(expresiones.cedula, e.target, e.target.name);
            break;
    }
}


const validarContraseña2 = () => {
    const inputPassword1 = document.getElementById('contrasenia');
    const inputPassword2 = document.getElementById('contrasenia2');

    if (inputPassword1.value !== inputPassword2.value) {

        document.getElementById(`grupo__contrasenia2`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__contrasenia2 .formulario__input-error`).classList.add('formulario__input-error-activo')

        campos['contrasenia'] = false;
    } else {
        document.getElementById(`grupo__contrasenia2`).classList.remove('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__contrasenia2 .formulario__input-error`).classList.remove('formulario__input-error-activo')

        campos['contrasenia'] = true;
    }
}

const validarCampo = (expresion, input, campo) => {

    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')

        campos[campo] = true;
    } else {

        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false;
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.usuario && campos.nombre && campos.apellido && campos.contrasenia && campos.correo && campos.cedula && campos.telefono) {

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const usuario = document.getElementById('usuario').value;
        const contrasenia = document.getElementById('contrasenia').value;
        const cedula = document.getElementById('cedula').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;

        // console.log(nombre, apellido, usuario)
        // creamos un objeto para el registro 

        const registroUsuario = {
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            contrasenia: contrasenia,
            cedula: cedula,
            correo: correo,
            telefono: telefono
        }
        // Convertimos el objeto en string para almacenarlo en Local 
        const registroString = JSON.stringify(registroUsuario);
        //Registrandose en Local Storage
        localStorage.setItem(usuario, registroString);
        formulario.reset();
        location.href = "login.html"

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')
        }, 5000)

    }
})