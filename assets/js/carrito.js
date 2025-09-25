// Carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    cargarItemsCarrito();
    configurarEventListeners();
    actualizarContadorCarrito();
});

// Cargar items del carrito
function cargarItemsCarrito() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (!cartItemsContainer) {
        console.error('Container cart-items no encontrado');
        return;
    }
    
    // Limpiar completamente el contenedor
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none'; // Ocultar mensaje de carrito vacío
    if (cartSummary) cartSummary.style.display = 'block'; // Mostrar resumen del carrito
    
    // Crear items usando template
    cart.forEach(item => {
        const itemElement = crearElementoCarrito(item);
        if (itemElement) {
            cartItemsContainer.appendChild(itemElement);
        }
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
    }
    
    // Configurar cantidad
    const quantityInput = itemElement.querySelector('.cantidad-input');
    quantityInput.value = itemCantidad;
    
    return itemElement;
}

// Configurar event listeners para los botones del carrito usando delegación de eventos
function configurarEventListeners() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    // Usar delegación de eventos para elementos dinámicos
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            // Botones de incrementar/decrementar cantidad
            if (e.target.classList.contains('cantidad-btn')) {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                const input = cartItem.querySelector('.cantidad-input');
                let cantidad = parseInt(input.value);
                
                if (e.target.classList.contains('increase')) {
                    cantidad += 1;
                } else if (e.target.classList.contains('decrease') && cantidad > 1) {
                    cantidad -= 1;
                }
                
                input.value = cantidad;
                actualizarCantidadItem(id, cantidad);
            }
            
            // Botones de eliminar
            if (e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-btn')) {
                const button = e.target.classList.contains('remove-btn') ? e.target : e.target.parentElement;
                const cartItem = button.closest('.cart-item');
                const id = cartItem.dataset.id;
                eliminarItemCarrito(id);
            }
        });
        
        // Event listener para cambios directos en el input de cantidad
        cartItemsContainer.addEventListener('change', function(e) {
            if (e.target.classList.contains('cantidad-input')) {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                let cantidad = parseInt(e.target.value);
                
                if (isNaN(cantidad) || cantidad < 1) {
                    cantidad = 1;
                    e.target.value = 1;
                }
                
                actualizarCantidadItem(id, cantidad);
            }
        });
    }
    
    // Botón de checkout (este no es dinámico)
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
    const item = cart.find(item => item.id == id); // Usar == para comparar string con number
    
    if (item) {
        const cantidadAnterior = item.cantidad;
        item.cantidad = cantidad;
        localStorage.setItem('carrito', JSON.stringify(cart));
        
        // Actualizar los cálculos y contador
        actualizarResumenCarrito();
        actualizarContadorCarrito();
    }
}

// Eliminar item del carrito
function eliminarItemCarrito(id) {
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Usar comparación flexible para evitar problemas de tipos
    cart = cart.filter(item => item.id != id);
    
    localStorage.setItem('carrito', JSON.stringify(cart));
    
    // Recargar la vista del carrito
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
        const cantidad = item.cantidad || item.quantity || 1;
        
        // Validar que precio y cantidad sean números válidos
        const precioValido = typeof precio === 'number' && precio >= 0 ? precio : 0;
        const cantidadValida = typeof cantidad === 'number' && cantidad >= 0 ? cantidad : 1;
        
        const subtotalItem = precioValido * cantidadValida;
        
        return total + subtotalItem;
    }, 0);
    
    const shipping = subtotal > 0 ? 5000 : 0; // Costo de envío fijo
    const total = subtotal + shipping;
    
    // Actualizar elementos DOM con validación
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    }
    if (shippingElement) {
        shippingElement.textContent = `$${shipping.toLocaleString('es-CL')}`;
    }
    if (totalElement) {
        totalElement.textContent = `$${total.toLocaleString('es-CL')}`;
    }
}

