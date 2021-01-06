const formulario = document.getElementById('formulario-login');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('inpt-usuario').value;
    const contrasenia = document.getElementById('inpt-password').value;

    //Comprobar si el usuario ingresado esta registrado
    const getUsuario = localStorage.getItem(usuario)
    const objetoUsuario = JSON.parse(getUsuario);

    const usuarioAdmin = 'Administrador';
    const contraseniaAdmin = 'admin1234';

    if (usuario == usuarioAdmin && contrasenia == contraseniaAdmin) {
        console.log('sesion de Administrador iniciada')
        location.href = 'administrador.html'
        //comprobamos que el usuario existe
    }else if (objetoUsuario) {



        const contrasenia = document.getElementById('inpt-password').value;

        if (contrasenia == objetoUsuario.contrasenia) {
            console.log('sesion iniciada')

            const objetoLogueado = {
                nombre: objetoUsuario.nombre,
                apellido: objetoUsuario.apellido,
                usuario: objetoUsuario.usuario,
                contrasenia: objetoUsuario.contrasenia,
                cedula: objetoUsuario.cedula,
                correo: objetoUsuario.correo,
                telefono: objetoUsuario.telefono,
                estado: 'online'
            }
            localStorage.setItem(usuario, JSON.stringify(objetoLogueado));

            setTimeout(() => {
                location.href = 'usuario.html'
            }, 1000)


        } else {
            document.querySelector('.formulario__input-error-login').classList.add('formulario__input-error-login-activo')

            setTimeout(() => {
                document.querySelector('.formulario__input-error-login').classList.remove('formulario__input-error-login-activo')
            }, 3000)
        }


    } else {
        document.querySelector('.formulario__input-error-login').classList.add('formulario__input-error-login-activo')
        setTimeout(() => {
            document.querySelector('.formulario__input-error-login').classList.remove('formulario__input-error-login-activo')
        }, 3000)
    }




})
