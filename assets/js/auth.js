// Funcionalidades de autenticación

document.addEventListener('DOMContentLoaded', function() {
    // verificar si el usuario ya está logueado
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (usuarioActual && usuarioActual.logueado) {
        window.location.href = 'index.html';
    }
    
    // cofigurar formulario de login si existe
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }
    
    // Configurar formulario de registro si existe
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegisterForm();
        });
    }
});

// Validar formulario de login
function validateLoginForm() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    
    let isValid = true;
    
    // Validar email
    if (!validateEmail(email.value)) {
        showError('login-email-error', 'Ingresa un email válido');
        isValid = false;
    } else if (!isAllowedEmail(email.value)) {
        showError('login-email-error', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        isValid = false;
    } else {
        hideError('login-email-error');
    }
    
    // Validar contraseña
    if (password.value.length < 4 || password.value.length > 10) {
        showError('login-password-error', 'La contraseña debe tener entre 4 y 10 caracteres');
        isValid = false;
    } else {
        hideError('login-password-error');
    }
    
    if (isValid) {
        // Obtener usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.email === email.value.toLowerCase() && u.contraseña === password.value);
        
        if (usuario) {
            // Guardar sesión de usuario
            localStorage.setItem('usuarioActual', JSON.stringify({
                nombre: usuario.nombre,
                email: usuario.email,
                logueado: true
            }));
            
            // Mostrar mensaje de éxito
            alert(`¡Bienvenido de vuelta, ${usuario.nombre}! Serás redirigido a la página principal.`);
            
            // Redirigir a la página principal después de 1 segundo
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showError('login-password-error', 'Email o contraseña incorrectos');
        }
    }
}

// Validar formulario de registro
function validateRegisterForm() {
    const nombre = document.getElementById('register-name');
    const email = document.getElementById('register-email');
    const contraseña = document.getElementById('register-password');
    const confirmarContraseña = document.getElementById('register-confirm-password');
    
    let isValid = true;
    
    // Validar nombre
    if (!nombre.value.trim()) {
        showError('register-name-error', 'El nombre es requerido');
        isValid = false;
    } else if (nombre.value.trim().length > 100) {
        showError('register-name-error', 'El nombre no puede tener más de 100 caracteres');
        isValid = false;
    } else {
        hideError('register-name-error');
    }
    
    // Validar email
    if (!validateEmail(email.value)) {
        showError('register-email-error', 'Ingresa un email válido');
        isValid = false;
    } else if (!isAllowedEmail(email.value)) {
        showError('register-email-error', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        isValid = false;
    } else {
        hideError('register-email-error');
    }
    
    // Validar contraseña
    if (contraseña.value.length < 4 || contraseña.value.length > 10) {
        showError('register-password-error', 'La contraseña debe tener entre 4 y 10 caracteres');
        isValid = false;
    } else {
        hideError('register-password-error');
    }
    
    // Validar confirmación de contraseña
    if (contraseña.value !== confirmarContraseña.value) {
        showError('register-confirm-password-error', 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        hideError('register-confirm-password-error');
    }
    
    if (isValid) {
        // Guardar usuario en localStorage
        const usuario = {
            nombre: nombre.value.trim(),
            email: email.value.toLowerCase(),
            contraseña: contraseña.value,
            fechaCreacion: new Date().toISOString()
        };
        
        // Obtener usuarios existentes
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Verificar si el usuario ya existe
        if (usuarios.find(u => u.email === usuario.email)) {
            showError('register-email-error', 'Este correo ya está registrado');
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
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Función para verificar si el email está permitido
function isAllowedEmail(email) {
    const dominiosPermitidos = ['outlook.cl', 'profesor.duoc.cl', 'gmail.com'];
    const dominio = email.split('@')[1];
    return dominiosPermitidos.includes(dominio);
}

// Función para mostrar errores
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Función para ocultar errores
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'login.html';
}