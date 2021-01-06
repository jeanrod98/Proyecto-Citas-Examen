
const usuarioLogueado = document.getElementById('dueño-mascota');
const cerrarSesion = document.getElementById('cerrar-sesion');
const formulario = document.getElementById('formulario-cita');


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
// console.log(usuarioActual)
usuarioLogueado.value = `${usuarioActual[0].nombre} ${usuarioActual[0].apellido}`;
// console.log(usuarioArray)

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

//Formulario de Cita para mascotas

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //Datos de los inputs


    const dueño = document.getElementById('dueño-mascota').value;
    const nombreMascota = document.getElementById('nombre-mascota').value;
    const tipo = document.getElementById('tipo-mascota').value;
    const fecha = document.getElementById('fecha-mascota').value;
    const sintomas = document.getElementById('sintomas').value;


    //consultar si tiene citas activas
    const existenciaCitas = localStorage.getItem(usuarioActual[0].cedula);



    if (nombreMascota == "" || fecha == "" || sintomas == "") {
        document.querySelector('.formulario__campoObligatorio-error').classList.add('formulario__campoObligatorio-error-activo')

        setTimeout(() => {
            document.querySelector('.formulario__campoObligatorio-error').classList.remove('formulario__campoObligatorio-error-activo')
        }, 3000)



    } else {
        if (existenciaCitas == null) {
            const citaMascota = {
                dueño: dueño,
                cedula: usuarioActual[0].cedula,
                nombre: nombreMascota,
                tipo: tipo,
                fechaCita: fecha,
                sintomas: sintomas,
                veterinario: 'Pendiente',
                estadoCita: 'Pendiente',
                servicio: 'Citas'
            }


            localStorage.setItem(usuarioActual[0].cedula, JSON.stringify(citaMascota))
            document.querySelector('.formulario__p-enviado').classList.add('formulario__p-enviado-activo')

            setTimeout(() => {
                document.querySelector('.formulario__p-enviado').classList.remove('formulario__p-enviado-activo')
                location.reload()
            }, 3000)


        } else if (JSON.parse(existenciaCitas).estadoCita == 'Aceptado') {
            const citaMascota1 = {
                dueño: dueño,
                cedula: usuarioActual[0].cedula,
                nombre: nombreMascota,
                tipo: tipo,
                fechaCita: fecha,
                sintomas: sintomas,
                veterinario: 'Pendiente',
                estadoCita: 'Pendiente',
                servicio: 'Citas'
            }


            localStorage.setItem(usuarioActual[0].cedula, JSON.stringify(citaMascota1))
            // console.log('Cita agendada con éxito')
            document.querySelector('.formulario__p-enviado').classList.add('formulario__p-enviado-activo')

            setTimeout(() => {
                document.querySelector('.formulario__p-enviado').classList.remove('formulario__p-enviado-activo')
                location.reload()

            }, 3000)


        } else {
            // console.log('Ya tiene citas sin aprobar, espere que el administrador acepte su cita para poder sacar otra');
            document.querySelector('.formulario__p-error').classList.add('formulario__p-error-activo')

            setTimeout(() => {
                document.querySelector('.formulario__p-error').classList.remove('formulario__p-error-activo')
                location.reload()
            }, 5000)
        }





    }


})