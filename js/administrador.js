//variables
const div_padre = document.querySelector('#contenido');
const btnLimpiar = document.getElementById('btn-limpiar');
const desde = document.getElementById('desde');
const hasta = document.getElementById('hasta');
const tipo = document.getElementById('tipo');


const datosBusqueda = {
    fechaDesde: '',
    fechaHasta: '',
    tipo: ''
}
//Eventos
document.addEventListener('DOMContentLoaded', () => {

    let citas = []
    let citasArray = []

    for (x = 0; x <= localStorage.length - 1; x++) {
        claves = localStorage.key(x);


        citas.push(claves)
        // determinarUsuario(usuarios);
    }

    citas.forEach(cita => {
        const datosCitas = JSON.parse(localStorage.getItem(cita))
        citasArray.push(datosCitas)

    });


    let totalCitas = citasArray.filter(total => {
        return total.servicio == 'Citas'
    })
    console.log(totalCitas)

    mostrarCitas(totalCitas);

    //Crear elementos y mostrar Citas
    function mostrarCitas(totalCitas) {

        limpiarHTML(); //elimina el html previo
        totalCitas.forEach(totalCita => {
            // console.log(totalCita.dueño)



            const div_contenedor = document.createElement('div');
            div_contenedor.id = 'tabla-detalles-admin';
            div_contenedor.classList.add('tabla-detalles-admin');

            //input 1
            const input_dueño = document.createElement('input');
            input_dueño.disabled = true;
            input_dueño.value = totalCita.dueño;
            input_dueño.id = 'inpt-dueño';

            //input 2
            const input_mascota = document.createElement('input');
            input_mascota.disabled = true;
            input_mascota.value = totalCita.nombre;
            input_mascota.id = 'inpt-nombre';

            //input 3
            const input_tipo = document.createElement('input');
            input_tipo.disabled = true;
            input_tipo.value = totalCita.tipo;
            input_tipo.id = 'inpt-tipo';

            //input 4
            const input_sintoma = document.createElement('input');
            input_sintoma.disabled = true;
            input_sintoma.value = totalCita.sintomas;
            input_sintoma.id = 'inpt-sintomas';

            //input 5
            const input_fecha = document.createElement('input');
            input_fecha.disabled = false;
            input_fecha.value = totalCita.fechaCita;
            input_fecha.id = 'inpt-fecha';
            input_fecha.type = 'date'

            //input 6
            const input_veterinario = document.createElement('input');
            input_veterinario.disabled = true;
            input_veterinario.value = totalCita.veterinario;
            input_veterinario.id = 'inpt-veterinario';

            //contenedor de botones
            const div_botones = document.createElement('div');
            div_botones.classList.add('div-acciones');

            //crear botones

            //boton1
            const btnEliminar = document.createElement('button');
            btnEliminar.id = 'btn-eliminar';
            btnEliminar.textContent = 'Eliminar'
            btnEliminar.onclick = eliminar;

            //boton2
            const btnModificar = document.createElement('button');
            btnModificar.id = 'btn-modificar';
            btnModificar.textContent = 'Modificar'
            btnModificar.onclick = modificar;

            //boton3
            const btnAceptar = document.createElement('button');
            btnAceptar.id = 'btn-aceptar';
            btnAceptar.textContent = 'Aceptar'
            btnAceptar.onclick = aceptar;


            //agregamos el boton al contenedor de botones
            div_botones.appendChild(btnEliminar);
            div_botones.appendChild(btnModificar);
            div_botones.appendChild(btnAceptar);

            //agregamos los inputs y botones al contenedor
            div_contenedor.appendChild(input_dueño)
            div_contenedor.appendChild(input_mascota)
            div_contenedor.appendChild(input_tipo)
            div_contenedor.appendChild(input_sintoma)
            div_contenedor.appendChild(input_fecha)
            div_contenedor.appendChild(input_veterinario)
            div_contenedor.appendChild(div_botones)

            //agregamos al elemento padre
            div_padre.appendChild(div_contenedor)
        });

    }
    //Evento para Limpiar busqueda
    btnLimpiar.addEventListener('click', (e) => {
        e.preventDefault();

        mostrarCitas(totalCitas);
    })
    //funcion para mostrar busqueda
    function limpiarHTML() {

        while (div_padre.firstChild) {
            div_padre.removeChild(div_padre.firstChild);

        }
    }
    //Funcion para modificar la fecha de la cita
    function modificar(e) {
        //Traversing para obtener los datos de cada cita 
        const elementoPadre = e.target.parentElement.parentElement.children
        const inptDueño = elementoPadre[0].value;
        const inptFecha = elementoPadre[4].value;


        let citasModificadas = totalCitas.filter(citaModificada => {
            return citaModificada.dueño == inptDueño
        })

        // console.log(citasModificadas[0])

        const citaModificada = {
            dueño: citasModificadas[0].dueño,
            cedula: citasModificadas[0].cedula,
            nombre: citasModificadas[0].nombre,
            tipo: citasModificadas[0].tipo,
            fechaCita: inptFecha,
            sintomas: citasModificadas[0].sintomas,
            veterinario: 'Pendiente',
            estadoCita: 'Pendiente',
            servicio: 'Citas'
        }

        localStorage.setItem(citasModificadas[0].cedula, JSON.stringify(citaModificada))
        //Mensaje de cita modificada
        document.getElementById('formulario__mensaje-modificar').classList.add('mensaje__accion-modificar-activo')
        setTimeout(() => {
            document.getElementById('formulario__mensaje-modificar').classList.remove('mensaje__accion-modificar-activo')
        }, 3000)
        setTimeout(() => {
            location.reload();
        }, 3000)

    }

    //funcion para aceptar la fecha de la cita

    function aceptar(e) {
        //Traversing para obtener los datos de cada cita 
        const elementoPadre = e.target.parentElement.parentElement.children
        const inptDueño = elementoPadre[0].value;


        //Obtenemos los datos de la cita segun su dueño
        let citasModificadas = totalCitas.filter(citaModificada => {
            return citaModificada.dueño == inptDueño
        })

        // console.log(citasModificadas[0])

        switch (citasModificadas[0].tipo) {
            case 'Gatos':
                const veterinario1 = 'Lic. Juan David Lopez Perez'
                const citaAceptada = {
                    dueño: citasModificadas[0].dueño,
                    cedula: citasModificadas[0].cedula,
                    nombre: citasModificadas[0].nombre,
                    tipo: citasModificadas[0].tipo,
                    fechaCita: citasModificadas[0].fechaCita,
                    sintomas: citasModificadas[0].sintomas,
                    veterinario: veterinario1,
                    estadoCita: 'Aceptado',
                    servicio: 'Citas'
                }


                //Mensaje de cita aceptada
                document.getElementById('formulario__mensaje-aceptar').classList.add('mensaje__accion-aceptar-activo')
                setTimeout(() => {
                    document.getElementById('formulario__mensaje-aceptar').classList.remove('mensaje__accion-aceptar-activo')
                }, 3000)
                // console.log(citaAceptada)
                localStorage.setItem(citasModificadas[0].cedula, JSON.stringify(citaAceptada))
                setTimeout(() => {
                    location.reload();
                }, 3000)
                break;
            case 'Perros':
                const veterinario2 = 'Lic. Diana Alexandra Mendoza Paz'
                const citaAceptada2 = {
                    dueño: citasModificadas[0].dueño,
                    cedula: citasModificadas[0].cedula,
                    nombre: citasModificadas[0].nombre,
                    tipo: citasModificadas[0].tipo,
                    fechaCita: citasModificadas[0].fechaCita,
                    sintomas: citasModificadas[0].sintomas,
                    veterinario: veterinario2,
                    estadoCita: 'Aceptado',
                    servicio: 'Citas'
                }


                //Mensaje de cita aceptada
                document.getElementById('formulario__mensaje-aceptar').classList.add('mensaje__accion-aceptar-activo')
                setTimeout(() => {
                    document.getElementById('formulario__mensaje-aceptar').classList.remove('mensaje__accion-aceptar-activo')
                }, 3000)
                // console.log(citaAceptada)
                localStorage.setItem(citasModificadas[0].cedula, JSON.stringify(citaAceptada2))
                setTimeout(() => {
                    location.reload();
                }, 3000)
                break;
            case 'Hamsters':
                const veterinario3 = 'Lic. Juan Carlos Zambrano Mera'
                const citaAceptada3 = {
                    dueño: citasModificadas[0].dueño,
                    cedula: citasModificadas[0].cedula,
                    nombre: citasModificadas[0].nombre,
                    tipo: citasModificadas[0].tipo,
                    fechaCita: citasModificadas[0].fechaCita,
                    sintomas: citasModificadas[0].sintomas,
                    veterinario: veterinario3,
                    estadoCita: 'Aceptado',
                    servicio: 'Citas'
                }

                //Mensaje de cita aceptada
                document.getElementById('formulario__mensaje-aceptar').classList.add('mensaje__accion-aceptar-activo')
                setTimeout(() => {
                    document.getElementById('formulario__mensaje-aceptar').classList.remove('mensaje__accion-aceptar-activo')
                }, 3000)
                // console.log(citaAceptada)
                localStorage.setItem(citasModificadas[0].cedula, JSON.stringify(citaAceptada3))
                setTimeout(() => {
                    location.reload();
                }, 3000)
                break;
            case 'Tortugas':
                const veterinario4 = 'Lic. Daniel David Romo Lopez'
                const citaAceptada4 = {
                    dueño: citasModificadas[0].dueño,
                    cedula: citasModificadas[0].cedula,
                    nombre: citasModificadas[0].nombre,
                    tipo: citasModificadas[0].tipo,
                    fechaCita: citasModificadas[0].fechaCita,
                    sintomas: citasModificadas[0].sintomas,
                    veterinario: veterinario4,
                    estadoCita: 'Aceptado',
                    servicio: 'Citas'
                }


                //Mensaje de cita aceptada
                document.getElementById('formulario__mensaje-aceptar').classList.add('mensaje__accion-aceptar-activo')
                setTimeout(() => {
                    document.getElementById('formulario__mensaje-aceptar').classList.remove('mensaje__accion-aceptar-activo')
                }, 3000)
                // console.log(citaAceptada)
                localStorage.setItem(citasModificadas[0].cedula, JSON.stringify(citaAceptada4))
                setTimeout(() => {
                    location.reload();
                }, 3000)
                break;

            case 'Conejos':
                const veterinario5 = 'Lic. Melanie Mariela Proaño Mendoza'
                const citaAceptada5 = {
                    dueño: citasModificadas[0].dueño,
                    cedula: citasModificadas[0].cedula,
                    nombre: citasModificadas[0].nombre,
                    tipo: citasModificadas[0].tipo,
                    fechaCita: citasModificadas[0].fechaCita,
                    sintomas: citasModificadas[0].sintomas,
                    veterinario: veterinario5,
                    estadoCita: 'Aceptado',
                    servicio: 'Citas'
                }


                //Mensaje de cita aceptada
                document.getElementById('formulario__mensaje-aceptar').classList.add('mensaje__accion-aceptar-activo')
                setTimeout(() => {
                    document.getElementById('formulario__mensaje-aceptar').classList.remove('mensaje__accion-aceptar-activo')
                }, 3000)
                // console.log(citaAceptada)
                localStorage.setItem(citasModificadas[0].cedula, JSON.stringify(citaAceptada5))
                setTimeout(() => {
                    location.reload();
                }, 3000)
                break;
        }


    }
    //funcion para eliminar las citas
    function eliminar(e) {

        //Traversing para obtener los datos de cada cita 
        const elementoPadre = e.target.parentElement.parentElement.children
        const inptDueño = elementoPadre[0].value;


        //Obtenemos los datos de la cita segun su dueño
        let citasModificadas = totalCitas.filter(citaModificada => {
            return citaModificada.dueño == inptDueño
        })
        const cedulaCita = citasModificadas[0].cedula

        //Mensaje de cita eliminar
        document.getElementById('formulario__mensaje-eliminar').classList.add('mensaje__accion-eliminar-activo')
        setTimeout(() => {
            document.getElementById('formulario__mensaje-eliminar').classList.remove('mensaje__accion-eliminar-activo')
        }, 3000)
        localStorage.removeItem(cedulaCita)
        setTimeout(() => {
            location.reload();
        }, 3000)
    }



    desde.addEventListener('change', e => {
        datosBusqueda.fechaDesde = e.target.value
        console.log(datosBusqueda);
        filtrarCita();

    })
    hasta.addEventListener('change', e => {
        datosBusqueda.fechaHasta = e.target.value
        console.log(datosBusqueda);
        filtrarCita();
    })
    tipo.addEventListener('change', e => {
        datosBusqueda.tipo = e.target.value

        filtrarCita();
        // console.log(datosBusqueda);
    })

    // funciones para filtrar

    function filtrarCita() {

        const resultado = totalCitas.filter(filtrarTipo).filter(filtrarDesde).filter(filtrarHasta);
        // console.log(resultado)
        mostrarCitas(resultado);

    }
    //filtrar por tipo
    function filtrarTipo(cita) {
        const { tipo } = datosBusqueda;
        if (tipo) {
            return cita.tipo === tipo;
        }
        return cita;
    }
    //filtrar por fecha desde
    function filtrarDesde(cita) {
        const { fechaDesde } = datosBusqueda;
        if (fechaDesde) {
            return cita.fechaCita >= fechaDesde;
        }
        return cita;
    }
    //filtrar por fecha hasta

    function filtrarHasta(cita) {
        const { fechaHasta } = datosBusqueda;
        if (fechaHasta) {
            return cita.fechaCita <= fechaHasta;
        }
        return cita;
    }

})


