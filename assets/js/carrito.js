// Carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    setupEventListeners();
});

// Cargar items del carrito
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}" class="item-img">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toLocaleString('es-CL')}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="quantity-btn decrease">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                <button class="quantity-btn increase">+</button>
                <button class="remove-btn"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Configurar event listeners para los botones del carrito
function setupEventListeners() {
    // Botones de incrementar/decrementar cantidad
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const id = cartItem.dataset.id;
            const input = cartItem.querySelector('.quantity-input');
            let quantity = parseInt(input.value);
            
            if (this.classList.contains('increase')) {
                quantity += 1;
            } else if (this.classList.contains('decrease') && quantity > 1) {
                quantity -= 1;
            }
            
            input.value = quantity;
            updateCartItemQuantity(id, quantity);
        });
    });
    
    // Input de cantidad directa
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const cartItem = this.closest('.cart-item');
            const id = cartItem.dataset.id;
            let quantity = parseInt(this.value);
            
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
                this.value = 1;
            }
            
            updateCartItemQuantity(id, quantity);
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const id = cartItem.dataset.id;
            removeCartItem(id);
        });
    });
    
    // Botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('¡Gracias por tu compra! Serás redirigido al proceso de pago.');
            // Vaciar carrito y redirigir
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }
}

// Actualizar cantidad de un item en el carrito
function updateCartItemQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSummary();
        updateCartCount();
    }
}

// Eliminar item del carrito
function removeCartItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Actualizar resumen del carrito
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5000 : 0; // Costo de envío fijo
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    shippingElement.textContent = `$${shipping.toLocaleString('es-CL')}`;
    totalElement.textContent = `$${total.toLocaleString('es-CL')}`;
}