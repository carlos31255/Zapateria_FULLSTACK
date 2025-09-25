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
            console.log('Toggle de menú presionado'); // Debug
        });
    }
    
    // Configurar el dropdown del usuario
    const botonMenuUsuario = document.querySelector('.user-menu-btn');
    if (botonMenuUsuario) {
        botonMenuUsuario.addEventListener('click', function() {
            document.querySelector('.user-dropdown').classList.toggle('active');
        });
    }
    
    // Mensaje de bienvenida en desarrollo
    if (esModoDesarrollo()) {
        setTimeout(() => {
            console.log('🚀 === MODO DESARROLLO ACTIVADO ===');
            console.log('💻 Ejecuta ayudaTesting() para ver todas las funciones disponibles');
            console.log('📦 Carrito actual:', (JSON.parse(localStorage.getItem('carrito')) || []).length, 'items');
            console.log('🔧 Todas las funciones disponibles solo por consola (F12)');
        }, 1000);
    }
});

// Actualizar la UI según el estado de autenticación
function actualizarUIAutenticacion() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const menuUsuario = document.getElementById('user-menu');
    const botonLogin = document.getElementById('login-btn');
    const nombreUsuario = document.getElementById('user-name');
    const adminLink = document.getElementById('admin-link');
    const vendedorLink = document.getElementById('vendedor-link');
    
    if (usuarioActual && usuarioActual.logueado) {
        // Mostrar menú de usuario y ocultar botón de login
        if (menuUsuario) menuUsuario.style.display = 'block';
        if (botonLogin) botonLogin.style.display = 'none';
        if (nombreUsuario) nombreUsuario.textContent = usuarioActual.nombre;
        
        // Mostrar enlaces según el rol del usuario
        if (adminLink) {
            adminLink.style.display = (usuarioActual.rol === 'admin') ? 'block' : 'none';
        }
        if (vendedorLink) {
            vendedorLink.style.display = (usuarioActual.rol === 'vendedor' || usuarioActual.rol === 'admin') ? 'block' : 'none';
        }
    } else {
        // Ocultar menú de usuario y mostrar botón de login
        if (menuUsuario) menuUsuario.style.display = 'none';
        if (botonLogin) botonLogin.style.display = 'block';
        
        // Ocultar enlaces de admin y vendedor
        if (adminLink) adminLink.style.display = 'none';
        if (vendedorLink) vendedorLink.style.display = 'none';
    }
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
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

// Función auxiliar para debugging - limpiar sesión
function limpiarSesion() {
    localStorage.removeItem('usuarioActual');
    actualizarUIAutenticacion();
    console.log('Sesión limpiada - página recargada');
}

// ===== FUNCIONES DE DEBUGGING Y TESTING =====

// Limpiar solo el carrito
function limpiarCarrito() {
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
    console.log('✅ Carrito limpiado');
    
    // Si estamos en la página del carrito, recargar los items
    if (typeof cargarItemsCarrito === 'function') {
        cargarItemsCarrito();
    }
    
    return 'Carrito limpiado exitosamente';
}

// Ver contenido del carrito
function verCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('📦 Contenido del carrito:', carrito);
    console.log('📊 Número de items:', carrito.length);
    console.log('💰 Total items:', carrito.reduce((total, item) => total + (item.cantidad || 0), 0));
    return carrito;
}

// Limpiar TODA la sesión (carrito + usuario)
function limpiarSesionCompleta() {
    localStorage.removeItem('carrito');
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('usuarios'); // Lista de usuarios registrados
    localStorage.removeItem('productos'); // Productos personalizados
    
    actualizarContadorCarrito();
    actualizarUIAutenticacion();
    
    console.log('🧹 Sesión completa limpiada');
    console.log('- Carrito: eliminado');
    console.log('- Usuario actual: eliminado');
    console.log('- Usuarios registrados: eliminados');
    console.log('- Productos personalizados: eliminados');
    
    return 'Sesión completa limpiada';
}

// Limpiar TODO el localStorage
function limpiarTodoLocalStorage() {
    const confirmacion = confirm('⚠️ ADVERTENCIA: Esto eliminará TODOS los datos del localStorage. ¿Continuar?');
    
    if (confirmacion) {
        localStorage.clear();
        actualizarContadorCarrito();
        actualizarUIAutenticacion();
        
        console.log('🗑️ TODO el localStorage ha sido limpiado');
        console.log('Se recomienda recargar la página');
        
        return 'localStorage completamente limpiado';
    } else {
        console.log('❌ Operación cancelada por el usuario');
        return 'Operación cancelada';
    }
}

// Ver TODO el contenido del localStorage
function verTodoLocalStorage() {
    console.log('🔍 === CONTENIDO COMPLETO DEL LOCALSTORAGE ===');
    
    if (localStorage.length === 0) {
        console.log('📭 localStorage está vacío');
        return {};
    }
    
    const datos = {};
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        try {
            const valor = JSON.parse(localStorage.getItem(clave));
            datos[clave] = valor;
            console.log(`📋 ${clave}:`, valor);
        } catch (e) {
            // Si no es JSON válido, mostrar como string
            const valor = localStorage.getItem(clave);
            datos[clave] = valor;
            console.log(`📄 ${clave} (string):`, valor);
        }
    }
    
    console.log('📊 Total de claves:', localStorage.length);
    return datos;
}

// Resetear a datos de prueba
function cargarDatosPrueba() {
    // Limpiar primero
    limpiarSesionCompleta();
    
    // Carrito de prueba
    const carritoPrueba = [
        {
            id: 1,
            nombre: "Zapatos Oxford Clásicos",
            precio: 89990,
            imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
            cantidad: 2
        },
        {
            id: 2,
            nombre: "Tacones Elegantes",
            precio: 75990,
            imagen: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop",
            cantidad: 1
        }
    ];
    
    // Usuario de prueba
    const usuarioPrueba = {
        nombre: "Usuario Test",
        email: "test@ejemplo.com",
        rol: "cliente",
        logueado: true
    };
    
    localStorage.setItem('carrito', JSON.stringify(carritoPrueba));
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioPrueba));
    
    actualizarContadorCarrito();
    actualizarUIAutenticacion();
    
    console.log('🧪 Datos de prueba cargados:');
    console.log('- Carrito con 2 productos');
    console.log('- Usuario test logueado');
    
    // Si estamos en la página del carrito, recargar
    if (typeof cargarItemsCarrito === 'function') {
        cargarItemsCarrito();
    }
    
    return 'Datos de prueba cargados exitosamente';
}

// Mostrar ayuda de testing
function ayudaTesting() {
    console.log('🔧 === FUNCIONES DE TESTING DISPONIBLES ===');
    console.log('');
    console.log('📦 CARRITO:');
    console.log('  limpiarCarrito()           - Limpia solo el carrito');
    console.log('  verCarrito()               - Muestra contenido del carrito');
    console.log('  agregarProductoPrueba()    - Agrega un producto de prueba');
    console.log('');
    console.log('👤 SESIÓN:');
    console.log('  limpiarSesion()            - Limpia solo sesión de usuario');
    console.log('  limpiarSesionCompleta()    - Limpia carrito + usuario + datos');
    console.log('');
    console.log('🗄️ LOCALSTORAGE:');
    console.log('  verTodoLocalStorage()      - Muestra todo el localStorage');
    console.log('  limpiarTodoLocalStorage()  - Limpia TODO (con confirmación)');
    console.log('');
    console.log('🧪 TESTING:');
    console.log('  cargarDatosPrueba()        - Carga datos de prueba');
    console.log('  probarSistemaCarrito()     - Prueba el sistema de carrito');
    console.log('  ayudaTesting()             - Muestra esta ayuda');
    console.log('');
    console.log('🎨 PANEL VISUAL:');
    console.log('  - Botón � en esquina superior derecha (solo en desarrollo)');
    console.log('  - Panel con botones para funciones más usadas');
    console.log('');
    console.log('⚡ ATAJOS RÁPIDOS DESDE CONSOLA:');
    console.log('  localStorage.clear()       - Limpia todo inmediatamente');
    console.log('  location.reload()          - Recarga la página');
    console.log('');
    console.log('�💡 TIP: Usa F12 -> Console para ejecutar estas funciones');
    console.log('🎯 RECOMENDADO: Siempre ejecuta verCarrito() antes de limpiar');
}

function agregarProductoPrueba() {
    const productoPrueba = {
        id: 999,
        nombre: "Producto de Prueba",
        precio: 15000,
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        stock: 10
    };
    
    // Usar el sistema unificado
    if (typeof agregarAlCarritoProducto === 'function') {
        console.log('Usando agregarAlCarritoProducto de productos.js');
        agregarAlCarritoProducto(productoPrueba);
    } else {
        console.log('Función agregarAlCarritoProducto no disponible, agregando manualmente');
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push({
            ...productoPrueba,
            cantidad: 1
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
    }
}

// Función para probar que el sistema funciona en ambas páginas
function probarSistemaCarrito() {
    console.log('=== PRUEBA DEL SISTEMA DE CARRITO ===');
    console.log('Página actual:', window.location.pathname);
    console.log('¿Existe agregarAlCarritoProducto?', typeof agregarAlCarritoProducto === 'function');
    console.log('¿Existe mostrarMensajeAgregarCarrito?', typeof mostrarMensajeAgregarCarrito === 'function');
    console.log('¿Existe crearTarjetaProducto?', typeof crearTarjetaProducto === 'function');
    
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Items en carrito:', carrito.length);
    console.log('Contenido del carrito:', carrito);
    
    return {
        agregarAlCarritoProducto: typeof agregarAlCarritoProducto === 'function',
        mostrarMensaje: typeof mostrarMensajeAgregarCarrito === 'function',
        crearTarjeta: typeof crearTarjetaProducto === 'function',
        itemsCarrito: carrito.length
    };
}







// Detectar si estamos en modo desarrollo
function esModoDesarrollo() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' || 
           window.location.port === '5500' ||
           window.location.protocol === 'file:';
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
    
    // Mensaje de bienvenida en desarrollo
    if (esModoDesarrollo()) {
        setTimeout(() => {
            console.log('🚀 === MODO DESARROLLO ACTIVADO ===');
            console.log(' Ejecuta ayudaTesting() para ver todas las funciones disponibles');
            console.log('📦 Carrito actual:', (JSON.parse(localStorage.getItem('carrito')) || []).length, 'items');
            console.log('🔧 Todas las funciones disponibles solo por consola (F12)');
        }, 1000);
    }
});
    
    // Los botones add-to-cart ahora se generan dinámicamente en productos.js


// Función wrapper para compatibilidad hacia atrás - usa el sistema unificado de productos.js
function agregarAlCarrito(id, nombre, precio) {
    // Crear objeto producto compatible con el sistema moderno
    const product = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: `https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        stock: 10 // Valor por defecto
    };
    
    // Usar la función unificada de productos.js
    if (typeof agregarAlCarritoProducto === 'function') {
        agregarAlCarritoProducto(product);
    } else {
        console.error('Función agregarAlCarritoProducto no disponible. Asegúrate de que productos.js esté cargado.');
    }
}