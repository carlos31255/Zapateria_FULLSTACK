// Carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    cargarItemsCarrito();
    configurarEventListeners();
    actualizarContadorCarrito();
});

// Cargar items del carrito
function cargarItemsCarrito() {
    console.log('Cargando items del carrito...');
    const cart = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener carrito del localStorage
    console.log('Carrito desde localStorage:', cart);
    const cartItemsContainer = document.getElementById('cart-items'); // Contenedor de items    
    const emptyCartMessage = document.getElementById('empty-cart-message'); // Mensaje de carrito vacío
    const cartSummary = document.querySelector('.cart-summary'); // Resumen del carrito
    
    console.log('Elementos DOM encontrados:', {
        cartItemsContainer: !!cartItemsContainer,
        emptyCartMessage: !!emptyCartMessage,
        cartSummary: !!cartSummary
    });
    
    if (cart.length === 0) {
        console.log('Carrito vacío, mostrando mensaje');
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    console.log('Carrito tiene items, mostrando productos...');
    if (emptyCartMessage) emptyCartMessage.style.display = 'none'; // Ocultar mensaje de carrito vacío
    if (cartSummary) cartSummary.style.display = 'block'; // Mostrar resumen del carrito
    
    console.log('Renderizando items del carrito:', cart);
    
    // Limpiar contenedor
    while (cartItemsContainer.firstChild) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild);
    }
    
    // Crear items usando template
    cart.forEach(item => {
        console.log('Renderizando item:', item);
        const itemElement = crearElementoCarrito(item);
        cartItemsContainer.appendChild(itemElement);
    });
    
    actualizarResumenCarrito();
}

// Crear elemento del carrito usando template HTML
function crearElementoCarrito(item) {
    // Validar propiedades del item
    const itemId = item.id || 'sin-id';
    const itemNombre = item.nombre || item.name || 'Producto sin nombre';
    const itemImagen = item.imagen || item.image || 'https://via.placeholder.com/100x100?text=Sin+Imagen';
    const itemPrecio = item.precio || item.price || 0;
    const itemCantidad = item.cantidad || item.quantity || 1;
    
    // Obtener template
    const template = document.getElementById('cart-item-template');
    if (!template) {
        console.error('Template de item del carrito no encontrado');
        return document.createElement('div');
    }
    
    // Clonar template
    const itemElement = template.content.cloneNode(true);
    
    // Configurar el elemento contenedor
    const cartItem = itemElement.querySelector('.cart-item');
    cartItem.setAttribute('data-id', itemId);
    
    // Configurar imagen
    const img = itemElement.querySelector('.item-img');
    img.src = itemImagen;
    img.alt = itemNombre;
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/100x100?text=Sin+Imagen';
    };
    
    // Configurar nombre del producto
    const nameElement = itemElement.querySelector('.item-name');
    nameElement.textContent = itemNombre;
    
    // Configurar precio con validación
    const priceElement = itemElement.querySelector('.item-price');
    if (typeof itemPrecio === 'number' && itemPrecio >= 0) {
        priceElement.textContent = `$${itemPrecio.toLocaleString('es-CL')}`;
    } else {
        priceElement.textContent = '$0';
        console.warn('Precio inválido para item:', item);
    }
    
    // Configurar cantidad
    const quantityInput = itemElement.querySelector('.cantidad-input');
    quantityInput.value = itemCantidad;
    
    return itemElement;
}

// Configurar event listeners para los botones del carrito
function configurarEventListeners() {
    // Botones de incrementar/decrementar cantidad
    document.querySelectorAll('.cantidad-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const id = cartItem.dataset.id;
            const input = cartItem.querySelector('.cantidad-input');
            let cantidad = parseInt(input.value);
            
            if (this.classList.contains('increase')) {
                cantidad += 1;
            } else if (this.classList.contains('decrease') && cantidad > 1) {
                cantidad -= 1;
            }
            
            input.value = cantidad;
            actualizarCantidadItem(id, cantidad);
        });
    });
    
    // Input de cantidad directa
    document.querySelectorAll('.cantidad-input').forEach(input => {
        input.addEventListener('change', function() {
            const cartItem = this.closest('.cart-item');
            const id = cartItem.dataset.id;
            let cantidad = parseInt(this.value);
            
            if (isNaN(cantidad) || cantidad < 1) {
                cantidad = 1;
                this.value = 1;
            }
            
            actualizarCantidadItem(id, cantidad);
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const id = cartItem.dataset.id;
            eliminarItemCarrito(id);
        });
    });
    
    // Botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('¡Gracias por tu compra! Serás redirigido al proceso de pago.');
            // Vaciar carrito y redirigir
            localStorage.removeItem('carrito');
            window.location.href = 'index.html';
        });
    }
}

// Actualizar cantidad de un item en el carrito
function actualizarCantidadItem(id, cantidad) {
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.cantidad = cantidad;
        localStorage.setItem('carrito', JSON.stringify(cart));
        actualizarResumenCarrito();
        actualizarContadorCarrito();
    }
}

// Eliminar item del carrito
function eliminarItemCarrito(id) {
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(cart));
    cargarItemsCarrito();
    actualizarContadorCarrito();
}

// Actualizar resumen del carrito
function actualizarResumenCarrito() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    
    const subtotal = cart.reduce((total, item) => {
        const precio = item.precio || item.price || 0;
        const cantidad = item.cantidad || item.quantity || 0;
        
        // Validar que precio y cantidad sean números válidos
        const precioValido = typeof precio === 'number' && precio >= 0 ? precio : 0;
        const cantidadValida = typeof cantidad === 'number' && cantidad >= 0 ? cantidad : 0;
        
        return total + (precioValido * cantidadValida);
    }, 0);
    
    const shipping = subtotal > 0 ? 5000 : 0; // Costo de envío fijo
    const total = subtotal + shipping;
    
    // Actualizar elementos DOM con validación
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toLocaleString('es-CL')}`;
    if (totalElement) totalElement.textContent = `$${total.toLocaleString('es-CL')}`;
}