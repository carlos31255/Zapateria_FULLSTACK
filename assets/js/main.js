// Funcionalidades generales del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar la UI según el estado de autenticación
    actualizarUIAutenticacion();
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Menú móvil
    const botonMenuMovil = document.querySelector('.mobile-menu-btn');
    const menuNav = document.querySelector('.navbar ul');
    
    if (botonMenuMovil && menuNav) {
        botonMenuMovil.addEventListener('click', function() {
            menuNav.classList.toggle('active');
            console.log('Menu toggle clicked'); // Debug
        });
    }
    
    // Configurar el dropdown del usuario
    const botonMenuUsuario = document.querySelector('.user-menu-btn');
    if (botonMenuUsuario) {
        botonMenuUsuario.addEventListener('click', function() {
            document.querySelector('.user-dropdown').classList.toggle('active');
        });
    }
    

});

// Actualizar la UI según el estado de autenticación
function actualizarUIAutenticacion() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const menuUsuario = document.getElementById('user-menu');
    const botonLogin = document.getElementById('login-btn');
    const nombreUsuario = document.getElementById('user-name');
    
    if (usuarioActual && usuarioActual.logueado) {
        if (menuUsuario) menuUsuario.style.display = 'block';
        if (botonLogin) botonLogin.style.display = 'none';
        if (nombreUsuario) nombreUsuario.textContent = usuarioActual.nombre;
    } else {
        if (menuUsuario) menuUsuario.style.display = 'none';
        if (botonLogin) botonLogin.style.display = 'block';
    }
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + (item.quantity || item.cantidad || 0), 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Función para validar email
function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
}

// Mantener función logout para compatibilidad hacia atrás
function logout() {
    cerrarSesion();
}







// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    actualizarUIAutenticacion();
    actualizarContadorCarrito();

    // Menú móvil
    const botonMenuMovil = document.querySelector('.mobile-menu-btn');
    const menuNav = document.querySelector('.navbar ul');
    if (botonMenuMovil && menuNav) {
        botonMenuMovil.addEventListener('click', function() {
            menuNav.classList.toggle('active');
        });
    }

    // Dropdown usuario
    const botonMenuUsuario = document.querySelector('.user-menu-btn');
    if (botonMenuUsuario) {
        botonMenuUsuario.addEventListener('click', function() {
            document.querySelector('.user-dropdown').classList.toggle('active');
        });
    }

});
    
    // Los botones add-to-cart ahora se generan dinámicamente en productos.js


// Añadir producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            quantity: 1,
            imagen: `https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    alert(`¡${nombre} añadido al carrito!`);
}

// Mantener función addToCart para compatibilidad hacia atrás
function addToCart(id, nombre, precio) {
    agregarAlCarrito(id, nombre, precio);
}