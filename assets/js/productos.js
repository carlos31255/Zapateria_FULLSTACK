// Productos JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en la página de productos
    if (document.getElementById('all-products')) {
        inicializarProductos();
        configurarFiltros();
    }
    
    // Si estamos en el index (productos destacados)
    if (document.getElementById('featured-products')) {
        inicializarProductosDestacados();
    }
    
    actualizarContadorCarrito();
});

// Datos de productos (simulando una base de datos)
const productsData = [
    {
        id: 1,
        nombre: "Zapatos Oxford Clásicos",
        precio: 89990,
        imagen: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
        categoria: "hombre",
        descripcion: "Elegantes zapatos Oxford de cuero genuino para hombre",
        stock: 15
    },
    {
        id: 2,
        nombre: "Tacones Elegantes",
        precio: 75990,
        imagen: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop",
        categoria: "mujer",
        descripcion: "Tacones altos elegantes para ocasiones especiales",
        stock: 8
    },
    {
        id: 3,
        nombre: "Zapatillas Deportivas",
        precio: 65990,
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        categoria: "deportivos",
        descripcion: "Zapatillas deportivas cómodas para running",
        stock: 20
    },
    {
        id: 4,
        nombre: "Botas de Cuero",
        precio: 125990,
        imagen: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&h=300&fit=crop",
        categoria: "hombre",
        descripcion: "Botas robustas de cuero para uso diario",
        stock: 12
    },
    {
        id: 5,
        nombre: "Sandalias de Verano",
        precio: 45990,
        imagen: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=300&h=300&fit=crop",
        categoria: "mujer",
        descripcion: "Sandalias cómodas para el verano",
        stock: 25
    },
    {
        id: 6,
        nombre: "Zapatos Escolares",
        precio: 35990,
        imagen: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b6?w=300&h=300&fit=crop",
        categoria: "niños",
        descripcion: "Zapatos escolares resistentes y cómodos",
        stock: 0
    },
    {
        id: 7,
        nombre: "Zapatillas Casual",
        precio: 55990,
        imagen: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=300&fit=crop",
        categoria: "mujer",
        descripcion: "Zapatillas casuales para uso diario",
        stock: 18
    },
    {
        id: 8,
        name: "Zapatos de Vestir",
        precio: 95990,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&h=300&fit=crop",
        categoria: "hombre",
        descripcion: "Zapatos formales para eventos especiales",
        stock: 10
    }
];

// Inicializar productos
function inicializarProductos() {

    // Cargar productos desde localStorage si existen, sino usar datos por defecto
    let products = JSON.parse(localStorage.getItem('productos')) || productsData;

    
    // Si no hay productos en localStorage, guardar los datos por defecto
    if (!localStorage.getItem('productos')) {

        localStorage.setItem('productos', JSON.stringify(productsData));
        products = productsData;
    }
    
    mostrarProductos(products);
}

// Mostrar productos en el DOM
function mostrarProductos(products) {
    const container = document.getElementById('all-products');
    
    // Limpiar contenedor
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    if (products.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<p>No se encontraron productos que coincidan con los filtros.</p>';
        container.appendChild(noResults);
        return;
    }
    
    products.forEach(product => {
        const productCard = crearTarjetaProducto(product);
        container.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function crearTarjetaProducto(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Imagen del producto o fallback si no hay imagen
    let imgElement;
    
    if (product.imagen && product.imagen.trim() !== '') {
        // Si tiene imagen válida, crear elemento img
        imgElement = document.createElement('img');
        imgElement.src = product.imagen;
        imgElement.alt = product.nombre;
        imgElement.className = 'product-img';
        imgElement.onerror = function() {
            // Si falla la carga, reemplazar con texto
            const textDiv = document.createElement('div');
            textDiv.className = 'product-img-fallback';
            textDiv.textContent = product.nombre || 'Producto';
            textDiv.style.cssText = `
                width: 100%;
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f8f9fa;
                color: #666;
                text-align: center;
                font-size: 14px;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 10px;
            `;
            this.parentNode.replaceChild(textDiv, this);
        };
    } else {
        // Si no tiene imagen, crear directamente el div con texto
        imgElement = document.createElement('div');
        imgElement.className = 'product-img-fallback';
        imgElement.textContent = product.nombre || 'Producto';
        imgElement.style.cssText = `
            width: 100%;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8f9fa;
            color: #666;
            text-align: center;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
        `;
    }
    
    // Información del producto
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    
    const title = document.createElement('h3');
    title.className = 'product-title';
    const nombreProducto = product.nombre || product.name || 'Producto sin nombre';
    title.textContent = nombreProducto;
    
    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.descripcion || '';
    
    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = `$${product.precio.toLocaleString('es-CL')}`;
    
    // Botón agregar al carrito
    const addButton = document.createElement('button');
    addButton.className = 'btn add-to-cart-btn';
    addButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Agregar al Carrito';
    addButton.addEventListener('click', () => agregarAlCarritoProducto(product));
    
    // Si no hay stock, deshabilitar botón
    if (product.stock === 0) {
        addButton.disabled = true;
        addButton.textContent = 'Sin Stock';
        addButton.classList.add('disabled');
    }
    
    // Ensamblar la tarjeta
    productInfo.appendChild(title);
    productInfo.appendChild(description);
    productInfo.appendChild(price);
    productInfo.appendChild(addButton);
    
    card.appendChild(imgElement);
    card.appendChild(productInfo);
    
    return card;
}

// Agregar producto al carrito
function agregarAlCarritoProducto(product) {
    
    if (product.stock <= 0) {
        alert('Este producto no tiene stock disponible');
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
        // Si ya existe, aumentar cantidad
        cart[existingItemIndex].cantidad += 1;
    } else {
        // Si no existe, agregar nuevo item
        cart.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen,
            cantidad: 1
        });
    }
    
    // Guardar carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(cart));
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    const nombreProducto = product.nombre || product.name || 'Producto sin nombre';
    mostrarMensajeAgregarCarrito(nombreProducto);
}

// Mostrar mensaje de confirmación
function mostrarMensajeAgregarCarrito(productName) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} agregado al carrito</span>
    `;
    
    // Estilos en línea para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Configurar filtros
function configurarFiltros() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const entradaBusqueda = document.getElementById('search-input');
    
    // Filtro de categoría
    categoryFilter.addEventListener('change', aplicarFiltros);
    
    // Filtro de precio
    priceFilter.addEventListener('input', function() {
        const value = parseInt(this.value);
        priceValue.textContent = `$${value.toLocaleString('es-CL')}`;
        aplicarFiltros();
    });
    
    // Filtro de búsqueda
    let searchTimeout;
    entradaBusqueda.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(aplicarFiltros, 300); // Debounce
    });
}

// Aplicar filtros
function aplicarFiltros() {
    const products = JSON.parse(localStorage.getItem('productos')) || productsData;
    const category = document.getElementById('category-filter').value;
    const maxPrice = parseInt(document.getElementById('price-filter').value);
    const terminoBusqueda = document.getElementById('search-input').value.toLowerCase();
    
    let filteredProducts = products.filter(product => {
        const matchesCategory = category === 'all' || product.categoria === category;
        const matchesPrice = product.precio <= maxPrice;
        const matchesSearch = product.nombre.toLowerCase().includes(terminoBusqueda) || 
                            product.descripcion.toLowerCase().includes(terminoBusqueda);
        
        return matchesCategory && matchesPrice && matchesSearch;
    });
    
    mostrarProductos(filteredProducts);
}

// Nota: actualizarContadorCarrito está definida en main.js

// Inicializar productos destacados en el index
function inicializarProductosDestacados() {
    let products = JSON.parse(localStorage.getItem('productos')) || productsData;
    
    // Si no hay productos en localStorage, guardar los datos por defecto
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(productsData));
        products = productsData;
    }
    
    // Mostrar solo los primeros 4 productos como destacados
    const featuredProducts = products.slice(0, 4);
    mostrarProductosDestacados(featuredProducts);
}

// Mostrar productos destacados en el index
function mostrarProductosDestacados(products) {
    const container = document.getElementById('featured-products');
    
    if (!container) {
        console.error('Contenedor featured-products no encontrado');
        return;
    }
    
    // Limpiar contenedor
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    products.forEach((product, index) => {
        const productCard = crearTarjetaProducto(product);
        container.appendChild(productCard);
    });
    
}
