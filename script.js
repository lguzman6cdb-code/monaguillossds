document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const inputUsuario = document.getElementById('usuario');
    const inputContrasena = document.getElementById('contrasena');
    const mensajeError = document.getElementById('mensajeError');

    // Función para verificar la sesión y redirigir
    function verificarSesion() {
        if (localStorage.getItem('sesionIniciada') === 'true') {
            window.location.replace('dashboard.html');
        }
    }

    // 1. Verificar sesión al cargar la página
    verificarSesion();

    // 2. Detectar cuando se usa el botón "Atrás" / "Adelante" (BFCache)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            verificarSesion();
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuario = inputUsuario.value.trim();
            const contrasena = inputContrasena.value.trim();

            mensajeError.textContent = '';
            mensajeError.style.color = '#ff4d4d';

            if (usuario === '' || contrasena === '') {
                mostrarMensaje('Por favor, completa todos los campos.');
                return;
            }

            // Credenciales de prueba
            const USUARIO_VALOR = 'monaguillossds';
            const CONTRASENA_VALOR = 'siemprealegres';

            if (usuario === USUARIO_VALOR && contrasena === CONTRASENA_VALOR) {
                mensajeError.style.color = '#a36232';
                mostrarMensaje('¡Inicio de sesión exitoso! Redirigiendo...');
                
                // Guardamos el estado de sesión activa
                localStorage.setItem('sesionIniciada', 'true');

                setTimeout(() => {
                    // Usamos replace para que index.html no quede en el historial de navegación
                    window.location.replace('dashboard.html'); 
                }, 1000);

            } else {
                mostrarMensaje('Usuario o contraseña incorrectos.');
                inputUsuario.style.borderColor = '#ff4d4d';
                inputContrasena.style.borderColor = '#ff4d4d';
            }
        });
    }

    function mostrarMensaje(texto) {
        mensajeError.textContent = texto;
    }
});
const inputImagen = document.getElementById('inputImagen');
const imageContainer = document.getElementById('imageContainer');
const imagenPrevisualizacion = document.getElementById('imagenPrevisualizacion');
const btnEliminarImagen = document.getElementById('btnEliminarImagen');

// 1. Al cargar la página, revisamos si ya hay una imagen guardada
window.addEventListener('DOMContentLoaded', () => {
    const imagenGuardada = localStorage.getItem('calendarioImagen');
    if (imagenGuardada) {
        imagenPrevisualizacion.src = imagenGuardada;
        imageContainer.style.display = 'flex';
        btnEliminarImagen.style.display = 'inline-block';
    }
});

// 2. Al seleccionar una imagen nueva, la mostramos y la guardamos en la memoria del navegador
inputImagen.addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function(e) {
            const base64Image = e.target.result;
            imagenPrevisualizacion.src = base64Image;
            imageContainer.style.display = 'flex';
            btnEliminarImagen.style.display = 'inline-block';
            
            // Guardamos la imagen para que no se borre al cerrar
            localStorage.setItem('calendarioImagen', base64Image);
        }
        lector.readAsDataURL(archivo);
    }
});

// 3. Al hacer clic en eliminar, se borra tanto de la pantalla como del almacenamiento
btnEliminarImagen.addEventListener('click', function() {
    inputImagen.value = '';
    imagenPrevisualizacion.src = '';
    imageContainer.style.display = 'none';
    btnEliminarImagen.style.display = 'none';
    
    // Removemos la imagen guardada
    localStorage.removeItem('calendarioImagen');
});
