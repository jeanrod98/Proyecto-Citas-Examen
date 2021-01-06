const cerrarSesion = document.getElementById('cerrar-sesion');

let usuarios = []
let usuarioArray = []

for (x = 0; x <= localStorage.length - 1; x++) {
    claves = localStorage.key(x);


    usuarios.push(claves)
    // determinarUsuario(usuarios);
}

usuarios.forEach(usuario => {
    const datosUduarios = JSON.parse(localStorage.getItem(usuario))
    usuarioArray.push(datosUduarios)

});


let usuarioActual = usuarioArray.filter(usuario => {
    return usuario.estado == 'online'
})

//Evento cerrar Sesion
cerrarSesion.addEventListener('click', (e) => {

    const registroUsuario = {
        nombre: usuarioActual[0].nombre,
        apellido: usuarioActual[0].apellido,
        usuario: usuarioActual[0].usuario,
        contrasenia: usuarioActual[0].contrasenia,
        cedula: usuarioActual[0].cedula,
        correo: usuarioActual[0].correo,
        telefono: usuarioActual[0].telefono
    }


    localStorage.setItem(usuarioActual[0].usuario, JSON.stringify(registroUsuario))
})

const cedulaActual = usuarioActual[0].cedula
const citaActual = JSON.parse(localStorage.getItem(cedulaActual))



const tablaDetalles = document.getElementById('tabla-detalles');

const elementoDueño = document.createElement('h4');
const elementoCedula = document.createElement('h4');
const elementoMascota = document.createElement('h4');
const elementoTipo = document.createElement('h4');
const elementoSintomas = document.createElement('h4');
const elementoFecha = document.createElement('h4');
const elementoVeterinario = document.createElement('h4');
const elementoEstado = document.createElement('h4');

elementoDueño.textContent = citaActual.dueño
elementoCedula.textContent = citaActual.cedula
elementoMascota.textContent = citaActual.nombre
elementoTipo.textContent = citaActual.tipo
elementoSintomas.textContent = citaActual.sintomas
elementoFecha.textContent = citaActual.fechaCita
elementoVeterinario.textContent = citaActual.veterinario
elementoEstado.textContent = citaActual.estadoCita

tablaDetalles.appendChild(elementoDueño)
tablaDetalles.appendChild(elementoCedula)
tablaDetalles.appendChild(elementoMascota)
tablaDetalles.appendChild(elementoTipo)
tablaDetalles.appendChild(elementoSintomas)
tablaDetalles.appendChild(elementoFecha)
tablaDetalles.appendChild(elementoVeterinario)
tablaDetalles.appendChild(elementoEstado)