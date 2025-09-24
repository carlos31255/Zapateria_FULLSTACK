// Funcionalidades de autenticación

document.addEventListener('DOMContentLoaded', function() {
    // verificar si el usuario ya está logueado
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (usuarioActual && usuarioActual.logueado) {
        if (usuarioActual.rol === "admin") {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    }
    
    // Inicializar selects de región y comuna si existen
    inicializarSelectsRegionComuna();

    // configurar formulario de login si existe
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validarLoginForm();
        });
    }
    
    // Configurar formulario de registro si existe
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validarRegistroForm();
        });
    }
});


// Inicializar selects de región y comuna
function inicializarSelectsRegionComuna() {
    const selectRegion = document.getElementById('registro-region');
    const selectComuna = document.getElementById('registro-comuna');
    
    if (selectRegion && selectComuna) {
        // Poblar select de regiones
        poblarSelectRegiones(selectRegion);
        
        // Agregar event listener para cambio de región
        selectRegion.addEventListener('change', function() {
            const regionSeleccionada = this.value;
            
            if (regionSeleccionada) {
                // Habilitar select de comunas y poblarlo
                selectComuna.disabled = false;
                poblarSelectComunas(selectComuna, regionSeleccionada);
            } else {
                // Deshabilitar y limpiar select de comunas
                selectComuna.disabled = true;
                selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
            }
            
            // Limpiar error de comuna si existe
            ocultarError('registro-comuna-error');
        });
    }
}

// Validar formulario de login
function validarLoginForm() {
    const email = document.getElementById('login-email');
    const contrasena = document.getElementById('login-contrasena');
    
    let isValid = true;
    
    // Validar email
    if (!validarEmail(email.value)) {
        mostrarError('login-email-error', 'Ingresa un email válido');
        isValid = false;
    } else if (!estaPermitidoEmail(email.value)) {
        mostrarError('login-email-error', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        isValid = false;
    } else {
        ocultarError('login-email-error');
    }
    
    // Validar contrasena
    if (contrasena.value.length < 4 || contrasena.value.length > 10) {
        mostrarError('login-contrasena-error', 'La contrasena debe tener entre 4 y 10 caracteres');
        isValid = false;
    } else {
        ocultarError('login-contrasena-error');
    }
    
    if (isValid) {
        // Obtener usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.email === email.value.toLowerCase() && u.contrasena === contrasena.value);
        
        if (usuario) {
    // Guardar sesión de usuario con rol
localStorage.setItem('usuarioActual', JSON.stringify({
    nombre: usuario.nombre,
    email: usuario.email,
    logueado: true,
    rol: usuario.rol || "cliente"   // 👈 guardamos el rol
}));

    
    // Mostrar mensaje de éxito
    alert(`¡Bienvenido de vuelta, ${usuario.nombre}!`);

    // 🚨 Redirigir según rol
    setTimeout(() => {
        if (usuario.rol === "admin") {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 1000);
} else {
    mostrarError('login-contrasena-error', 'Email o contrasena incorrectos');
}

    }
}

// Validar formulario de registro
function validarRegistroForm() {
    // Obtener elementos del formulario con los IDs correctos
    const run = document.getElementById('registro-run');
    const nombre = document.getElementById('registro-nombre');
    const email = document.getElementById('registro-email');
    const nacimiento = document.getElementById('registro-nacimiento');
    const region = document.getElementById('registro-region');
    const comuna = document.getElementById('registro-comuna');
    const direccion = document.getElementById('registro-direccion');
    const contrasena = document.getElementById('registro-contrasena');
    const confirmarContrasena = document.getElementById('registro-confirmar-contrasena');
    
    let isValid = true;
    
    // Validar RUT
    if (!run.value.trim()) {
        mostrarError('registro-run-error', 'El RUT es requerido');
        isValid = false;
    } else if (!validarRUT(run.value.trim())) {
        mostrarError('registro-run-error', 'Ingresa un RUT válido sin puntos ni guión (ej: 19011022K). Mín: 7, Máx: 9 caracteres');
        isValid = false;
    } else {
        ocultarError('registro-run-error');
    }
    
    // Validar nombre
    if (!nombre.value.trim()) {
        mostrarError('registro-nombre-error', 'El nombre es requerido');
        isValid = false;
    } else if (nombre.value.trim().length > 100) {
        mostrarError('registro-nombre-error', 'El nombre no puede tener más de 100 caracteres');
        isValid = false;
    } else {
        ocultarError('registro-nombre-error');
    }
    
    // Validar email
    if (!validarEmail(email.value)) {
        mostrarError('registro-email-error', 'Ingresa un email válido');
        isValid = false;
    } else if (!estaPermitidoEmail(email.value)) {
        mostrarError('registro-email-error', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        isValid = false;
    } else {
        ocultarError('registro-email-error');
    }
    
    // Validar fecha de nacimiento
    if (!nacimiento.value) {
        mostrarError('registro-nacimiento-error', 'La fecha de nacimiento es requerida');
        isValid = false;
    } else if (!esMayorDeEdad(nacimiento.value)) {
        mostrarError('registro-nacimiento-error', 'Debes ser mayor de 18 años');
        isValid = false;
    } else {
        ocultarError('registro-nacimiento-error');
    }
    
    // Validar región
    if (!region.value) {
        mostrarError('registro-region-error', 'Selecciona una región');
        isValid = false;
    } else {
        ocultarError('registro-region-error');
    }
    
    // Validar comuna
    if (!comuna.value) {
        mostrarError('registro-comuna-error', 'Selecciona una comuna');
        isValid = false;
    } else {
        ocultarError('registro-comuna-error');
    }
    
    // Validar dirección
    if (!direccion.value.trim()) {
        mostrarError('registro-direccion-error', 'La dirección es requerida');
        isValid = false;
    } else {
        ocultarError('registro-direccion-error');
    }
    
    // Validar contrasena
    if (contrasena.value.length < 4 || contrasena.value.length > 10) {
        mostrarError('registro-contrasena-error', 'La contrasena debe tener entre 4 y 10 caracteres');
        isValid = false;
    } else {
        ocultarError('registro-contrasena-error');
    }
    
    // Validar confirmación de contrasena
    if (contrasena.value !== confirmarContrasena.value) {
        mostrarError('registro-confirmar-contrasena-error', 'Las contrasenas no coinciden');
        isValid = false;
    } else {
        ocultarError('registro-confirmar-contrasena-error');
    }

    if (isValid) {
        // Guardar usuario en localStorage con todos los datos
const usuario = {
    run: run.value.trim(),
    nombre: nombre.value.trim(),
    email: email.value.toLowerCase(),
    nacimiento: nacimiento.value,
    region: region.value,
    comuna: comuna.value,
    direccion: direccion.value.trim(),
    contrasena: contrasena.value,
    fechaCreacion: new Date().toISOString(),
    rol: "cliente"   // 👈 nuevo campo
};

        
        // Obtener usuarios existentes
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Verificar si el usuario ya existe (por email o RUT)
        if (usuarios.find(u => u.email === usuario.email)) {
            mostrarError('registro-email-error', 'Este correo ya está registrado');
            return;
        }
        
        if (usuarios.find(u => u.run === usuario.run)) {
            mostrarError('registro-run-error', 'Este RUT ya está registrado');
            return;
        }
        
        // Agregar nuevo usuario
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar mensaje de éxito
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        
        // Redirigir a la página de login
        window.location.href = 'login.html';
    }
}

// Función para validar email
function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Función para validar RUT chileno (formato sin puntos ni guión: ej: 19011022K)
function validarRUT(rut) {
    // Limpiar RUT (quitar espacios si los hay)
    const limpiarRut = rut.replace(/\s/g, '').toUpperCase();
    
    // Verificar longitud (min 7, max 9 caracteres)
    if (limpiarRut.length < 7 || limpiarRut.length > 9) {
        return false;
    }
    
    // Verificar formato: números seguidos de dígito verificador (número o K)
    const patronRut = /^\d{6,8}[0-9K]$/;
    if (!patronRut.test(limpiarRut)) {
        return false;
    }
    
    // Separar número y dígito verificador
    const numeroRut = limpiarRut.slice(0, -1);
    const dv = limpiarRut.slice(-1);

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = numeroRut.length - 1; i >= 0; i--) {
        sum += parseInt(numeroRut[i]) * multiplier;
        multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }
    
    const dvEsperado = 11 - (sum % 11);
    let dvCalculado;

    if (dvEsperado === 11) dvCalculado = '0';
    else if (dvEsperado === 10) dvCalculado = 'K';
    else dvCalculado = dvEsperado.toString();

    return dv === dvCalculado;
}

// Función para verificar mayoría de edad
function esMayorDeEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const difMeses = hoy.getMonth() - nacimiento.getMonth();

    if (difMeses < 0 || (difMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad >= 18;
}

// Función para verificar si el email está permitido
function estaPermitidoEmail(email) {
    const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    const dominio = email.split('@')[1];
    return dominiosPermitidos.includes(dominio);
}

// Función para mostrar errores
function mostrarError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Función para ocultar errores
function ocultarError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'login.html';
}