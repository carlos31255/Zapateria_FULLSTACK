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
    
    //Cargar productos destacados
    if (document.getElementById('featured-products')) {
        cargarProductosDestacados();
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
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
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

// Cargar productos destacados
function cargarProductosDestacados() {
    const contenedorProductosDestacados = document.getElementById('featured-products');
    const productos = [
        {
            id: 1,
            nombre: "Zapatillas Deportivas",
            precio: 89900,
            imagen: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            nombre: "Botines de Cuero",
            precio: 119900,
            imagen: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            nombre: "Zapatos Formales",
            precio: 99900,
            imagen: "https://images.unsplash.com/photo-1562272456-87065009fe68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            nombre: "Sandalias de Verano",
            precio: 49900,
            imagen: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];
    
    contenedorProductosDestacados.innerHTML = productos.map(producto => `
        <div class="product-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
                <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}">Añadir al Carrito</button>
            </div>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones de añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.dataset.id;
            const nombre = this.dataset.name;
            const precio = parseInt(this.dataset.price);
            agregarAlCarrito(id, nombre, precio);
        });
    });
}

// Añadir producto al carrito
function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            cantidad: 1,
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