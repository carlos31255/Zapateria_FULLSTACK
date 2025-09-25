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
    console.log(`Elemento creado con data-id: ${itemId} (tipo: ${typeof itemId})`);
    
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
                console.log(`Cantidad actualizada para item ${id}: ${cantidad}`);
            }
            
            // Botones de eliminar
            if (e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-btn')) {
                const button = e.target.classList.contains('remove-btn') ? e.target : e.target.parentElement;
                const cartItem = button.closest('.cart-item');
                const id = cartItem.dataset.id;
                eliminarItemCarrito(id);
                console.log(`Item eliminado: ${id}`);
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
                console.log(`Cantidad actualizada manualmente para item ${id}: ${cantidad}`);
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
    console.log(`Actualizando cantidad del item ${id} a ${cantidad}`);
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const item = cart.find(item => item.id == id); // Usar == para comparar string con number
    
    if (item) {
        const cantidadAnterior = item.cantidad;
        item.cantidad = cantidad;
        localStorage.setItem('carrito', JSON.stringify(cart));
        
        console.log(`Item ${id}: cantidad cambiada de ${cantidadAnterior} a ${cantidad}`);
        
        // Actualizar los cálculos y contador
        actualizarResumenCarrito();
        actualizarContadorCarrito();
        
        console.log('Resumen y contador actualizados');
    } else {
        console.error(`No se encontró el item con id ${id} en el carrito`);
    }
}

// Eliminar item del carrito
function eliminarItemCarrito(id) {
    console.log(`Eliminando item con ID: ${id} (tipo: ${typeof id})`);
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    
    console.log('Carrito antes de eliminar:', cart);
    console.log('IDs en carrito:', cart.map(item => `${item.id} (${typeof item.id})`));
    
    const cartLengthBefore = cart.length;
    
    // Usar comparación flexible para evitar problemas de tipos
    cart = cart.filter(item => item.id != id); // Usar != en lugar de !==
    
    console.log(`Items antes: ${cartLengthBefore}, después: ${cart.length}`);
    
    if (cartLengthBefore === cart.length) {
        console.error(`⚠️ No se eliminó ningún item. Verificar ID: ${id}`);
        console.log('Items disponibles para eliminar:', cart.map(item => ({ id: item.id, nombre: item.nombre })));
    } else {
        console.log(`✅ Item eliminado exitosamente. Carrito actualizado.`);
    }
    
    localStorage.setItem('carrito', JSON.stringify(cart));
    console.log('Carrito guardado en localStorage:', cart);
    
    // Recargar la vista del carrito
    cargarItemsCarrito();
    actualizarContadorCarrito();
}

// Actualizar resumen del carrito
function actualizarResumenCarrito() {
    console.log('Actualizando resumen del carrito...');
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    
    console.log('Items en carrito para cálculo:', cart);
    
    const subtotal = cart.reduce((total, item) => {
        const precio = item.precio || item.price || 0;
        const cantidad = item.cantidad || item.quantity || 1;
        
        // Validar que precio y cantidad sean números válidos
        const precioValido = typeof precio === 'number' && precio >= 0 ? precio : 0;
        const cantidadValida = typeof cantidad === 'number' && cantidad >= 0 ? cantidad : 1;
        
        const subtotalItem = precioValido * cantidadValida;
        console.log(`Item ${item.id || item.name}: $${precioValido} x ${cantidadValida} = $${subtotalItem}`);
        
        return total + subtotalItem;
    }, 0);
    
    const shipping = subtotal > 0 ? 5000 : 0; // Costo de envío fijo
    const total = subtotal + shipping;
    
    console.log(`Subtotal: $${subtotal}, Envío: $${shipping}, Total: $${total}`);
    
    // Actualizar elementos DOM con validación
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        console.log('Subtotal actualizado en DOM');
    }
    if (shippingElement) {
        shippingElement.textContent = `$${shipping.toLocaleString('es-CL')}`;
        console.log('Envío actualizado en DOM');
    }
    if (totalElement) {
        totalElement.textContent = `$${total.toLocaleString('es-CL')}`;
        console.log('Total actualizado en DOM');
    }
}

// Función de prueba para verificar el sistema de cantidades (solo desarrollo)
function probarSistemaCantidades() {
    console.log('=== PRUEBA DEL SISTEMA DE CANTIDADES ===');
    
    // Agregar productos de prueba si el carrito está vacío
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    if (cart.length === 0) {
        console.log('Carrito vacío, agregando productos de prueba...');
        const productosPrueba = [
            { id: 1, nombre: "Zapatos de Prueba 1", precio: 50000, cantidad: 2 },
            { id: 2, nombre: "Zapatos de Prueba 2", precio: 75000, cantidad: 1 }
        ];
        localStorage.setItem('carrito', JSON.stringify(productosPrueba));
        cart = productosPrueba;
    }
    
    console.log('Estado inicial del carrito:', cart);
    
    // Verificar elementos DOM
    const elementos = {
        subtotal: document.getElementById('cart-subtotal'),
        shipping: document.getElementById('cart-shipping'),
        total: document.getElementById('cart-total'),
        container: document.getElementById('cart-items')
    };
    
    console.log('Elementos DOM encontrados:', {
        subtotal: !!elementos.subtotal,
        shipping: !!elementos.shipping,
        total: !!elementos.total,
        container: !!elementos.container
    });
    
    // Actualizar resumen
    actualizarResumenCarrito();
    
    // Si estamos en la página del carrito, recargar items
    if (typeof cargarItemsCarrito === 'function') {
        cargarItemsCarrito();
    }
    
    console.log('=== PRUEBA COMPLETADA ===');
    console.log('💡 Usa los botones + y - para probar el cambio de cantidades');
    console.log('💡 Revisa la consola para ver los logs de actualización');
    
    return {
        carrito: cart,
        elementos: elementos,
        funcionesDisponibles: {
            cargarItemsCarrito: typeof cargarItemsCarrito === 'function',
            actualizarResumenCarrito: typeof actualizarResumenCarrito === 'function',
            actualizarCantidadItem: typeof actualizarCantidadItem === 'function'
        }
    };
}

// Función de prueba específica para eliminación de items
function probarEliminacionItems() {
    console.log('=== PRUEBA DE ELIMINACIÓN DE ITEMS ===');
    
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Items en carrito:', cart);
    
    if (cart.length === 0) {
        console.log('⚠️ Carrito vacío. Agregando items de prueba...');
        const itemsPrueba = [
            { id: 1, nombre: "Item Test 1", precio: 10000, cantidad: 1 },
            { id: 2, nombre: "Item Test 2", precio: 20000, cantidad: 2 }
        ];
        localStorage.setItem('carrito', JSON.stringify(itemsPrueba));
        console.log('Items de prueba agregados');
        
        if (typeof cargarItemsCarrito === 'function') {
            cargarItemsCarrito();
        }
    }
    
    // Verificar elementos DOM
    const items = document.querySelectorAll('.cart-item');
    console.log(`Items DOM encontrados: ${items.length}`);
    
    items.forEach((item, index) => {
        const id = item.dataset.id;
        const nombre = item.querySelector('.item-name')?.textContent;
        console.log(`Item ${index + 1}: ID=${id} (${typeof id}), Nombre=${nombre}`);
    });
    
    // Verificar botones de eliminar
    const removeButtons = document.querySelectorAll('.remove-btn');
    console.log(`Botones de eliminar encontrados: ${removeButtons.length}`);
    
    console.log('💡 Para probar eliminación:');
    console.log('1. Haz clic en el botón de eliminar (🗑️)');
    console.log('2. Observa los logs en consola');
    console.log('3. Verifica que el item desaparezca visualmente');
    
    return {
        itemsCarrito: cart.length,
        itemsDOM: items.length,
        botonesEliminar: removeButtons.length
    };
}