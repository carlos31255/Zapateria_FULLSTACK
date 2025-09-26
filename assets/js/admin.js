// GESTIÓN DE USUARIOS

// Cargar usuarios desde localStorage
function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const tbody = document.getElementById('usuarios-table');
  
  // Limpiar la tabla primero
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    
    // Celda Nombre
    const tdNombre = document.createElement('td');
    tdNombre.textContent = u.nombre;
    tr.appendChild(tdNombre);
    
    // Celda Email
    const tdEmail = document.createElement('td');
    tdEmail.textContent = u.email;
    tr.appendChild(tdEmail);
    
    // Celda Rol
    const tdRol = document.createElement('td');
    const spanRol = document.createElement('span');
    spanRol.className = `badge ${obtenerClaseRol(u.rol)}`;
    spanRol.textContent = u.rol;
    tdRol.appendChild(spanRol);
    tr.appendChild(tdRol);
    
    // Celda Fecha
    const tdFecha = document.createElement('td');
    tdFecha.textContent = u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleDateString() : 'No disponible';
    tr.appendChild(tdFecha);
    
    // Celda Acciones
    const tdAcciones = document.createElement('td');
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-sm btn-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarUsuario(u.email));
    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdAcciones);
    
    tbody.appendChild(tr);
  });
}


function obtenerClaseRol(rol) {
  switch(rol) {
    case 'admin': return 'bg-danger';
    case 'vendedor': return 'bg-warning text-dark';
    case 'cliente': return 'bg-info';
    default: return 'bg-secondary';
  }
}

function obtenerClaseCategoria(categoria) {
  switch(categoria) {
    case 'hombre': return 'bg-primary';
    case 'mujer': return 'bg-success';
    case 'niños': return 'bg-warning text-dark';
    case 'deportivos': return 'bg-info';
    default: return 'bg-secondary';
  }
}

// Mostrar formulario de creación de usuario
function mostrarFormularioUsuario() {
  const formulario = document.getElementById('form-usuario');
  if (formulario) {
    formulario.style.display = 'block';
    
    // Cargar regiones básicas en el select
    const selectRegion = document.getElementById('regionUsuario');
    if (selectRegion) {
      selectRegion.innerHTML = `
        <option value="">Seleccionar región</option>
        <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
        <option value="Región de Valparaíso">Región de Valparaíso</option>
        <option value="Región del Biobío">Región del Biobío</option>
        <option value="Región de La Araucanía">Región de La Araucanía</option>
        <option value="Región de Los Lagos">Región de Los Lagos</option>
      `;
      
      // Agregar event listener para cambio de región
      selectRegion.onchange = function() {
        const selectComuna = document.getElementById('comunaUsuario');
        if (selectComuna) {
          if (this.value === 'Región Metropolitana de Santiago') {
            selectComuna.innerHTML = `
              <option value="">Seleccionar comuna</option>
              <option value="Santiago">Santiago</option>
              <option value="Las Condes">Las Condes</option>
              <option value="Providencia">Providencia</option>
              <option value="Maipú">Maipú</option>
              <option value="Puente Alto">Puente Alto</option>
            `;
            selectComuna.disabled = false;
          } else {
            selectComuna.innerHTML = '<option value="">Seleccionar comuna</option>';
            selectComuna.disabled = false;
          }
        }
      };
    }
  }
}

// Cancelar creación de usuario
function cancelarFormularioUsuario() {
  document.getElementById('form-usuario').style.display = 'none';
  limpiarFormularioUsuario();
}

// Limpiar formulario
function limpiarFormularioUsuario() {
  document.getElementById('nombreUsuario').value = '';
  document.getElementById('emailUsuario').value = '';
  document.getElementById('contrasenaUsuario').value = '';
  document.getElementById('rolUsuario').value = '';
  document.getElementById('generoUsuario').value = '';
  document.getElementById('fechaNacimientoUsuario').value = '';
  document.getElementById('regionUsuario').value = '';
  document.getElementById('comunaUsuario').innerHTML = '<option value="">Primero selecciona una región</option>';
  document.getElementById('comunaUsuario').disabled = true;
}

// Guardar nuevo usuario
function guardarUsuario() {
  const nombre = document.getElementById('nombreUsuario').value.trim();
  const email = document.getElementById('emailUsuario').value.trim();
  const contrasena = document.getElementById('contrasenaUsuario').value.trim();
  const rol = document.getElementById('rolUsuario').value;
  const genero = document.getElementById('generoUsuario').value;
  const fechaNacimiento = document.getElementById('fechaNacimientoUsuario').value;
  const region = document.getElementById('regionUsuario').value;
  const comuna = document.getElementById('comunaUsuario').value;

  // Validaciones básicas
  if (!nombre || !email || !contrasena || !rol) {
    return alert("Complete los campos obligatorios: nombre, email, contraseña y rol");
  }

  if (contrasena.length < 6) {
    return alert("La contraseña debe tener al menos 6 caracteres");
  }

  // Verificar que el email no esté duplicado
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(u => u.email === email)) {
    return alert("Ya existe un usuario con ese correo electrónico");
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    nombre,
    email,
    contrasena,
    fechaNacimiento,
    genero,
    region,
    comuna,
    rol,
    fechaCreacion: new Date().toISOString()
  };

  // Agregar a la lista de usuarios
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Ocultar formulario y recargar tabla
  cancelarFormularioUsuario();
  cargarUsuarios();

  alert(`Usuario ${rol} creado exitosamente: ${nombre} (${email})`);
}

function eliminarUsuario(email) {
  if (!confirm('¿Está seguro de que desea eliminar este usuario?')) return;
  
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios = usuarios.filter(u => u.email !== email);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  cargarUsuarios();
}

// ====================================
// GESTIÓN DE PRODUCTOS  
// ==================================== 
function mostrarFormularioProducto() {
  document.getElementById('form-producto').style.display = 'block';
}

function guardarProducto() {
  const nombre = document.getElementById('nombreProducto').value.trim();
  const categoria = document.getElementById('categoriaProducto').value;
  const precio = parseInt(document.getElementById('precioProducto').value);
  const imagen = document.getElementById('imagenProducto').value.trim();
  const descripcion = document.getElementById('descripcionProducto').value.trim();
  const stock = parseInt(document.getElementById('stockProducto').value);

  if (!nombre || !categoria || !precio || !imagen || isNaN(stock)) {
    return alert("Completa todos los campos obligatorios (nombre, categoría, precio, imagen, stock)");
  }

  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push({
    id: Date.now(),
    nombre,
    categoria,
    precio,
    imagen,
    descripcion,
    stock
  });

  localStorage.setItem('productos', JSON.stringify(productos));

  // Resetear formulario
  document.getElementById('form-producto').style.display = 'none';
  document.getElementById('nombreProducto').value = "";
  document.getElementById('categoriaProducto').value = "";
  document.getElementById('precioProducto').value = "";
  document.getElementById('imagenProducto').value = "";
  document.getElementById('descripcionProducto').value = "";
  document.getElementById('stockProducto').value = "";

  cargarProductos();
}


function cargarProductos() {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const tbody = document.getElementById('productos-table');
  
  // Limpiar la tabla primero
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  productos.forEach(p => {
    const tr = document.createElement('tr');
    
    // Celda Nombre
    const tdNombre = document.createElement('td');
    tdNombre.textContent = p.nombre;
    tr.appendChild(tdNombre);
    
    // Celda Categoría
    const tdCategoria = document.createElement('td');
    const spanCategoria = document.createElement('span');
    spanCategoria.className = `badge ${obtenerClaseCategoria(p.categoria)}`;
    spanCategoria.textContent = p.categoria || 'Sin categoría';
    tdCategoria.appendChild(spanCategoria);
    tr.appendChild(tdCategoria);
    
    // Celda Precio
    const tdPrecio = document.createElement('td');
    tdPrecio.textContent = `$${p.precio.toLocaleString('es-CL')}`;
    tr.appendChild(tdPrecio);
    
    // Celda Stock
    const tdStock = document.createElement('td');
    tdStock.textContent = p.stock || 0;
    tdStock.style.color = (p.stock || 0) <= 5 ? '#dc3545' : '#28a745';
    tdStock.style.fontWeight = 'bold';
    tr.appendChild(tdStock);
    
    // Celda Acciones
    const tdAcciones = document.createElement('td');
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-sm btn-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarProducto(p.id));
    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdAcciones);
    
    tbody.appendChild(tr);
  });
}



function eliminarProducto(id) {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));
  cargarProductos();
}

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  cargarProductos();
  
  // DEBUG: Función para verificar productos en localStorage
  window.verificarProductos = function() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    console.log('📦 Productos en localStorage:');
    productos.forEach(p => {
      console.log(`- ${p.nombre} | Categoría: ${p.categoria} | Precio: $${p.precio} | Stock: ${p.stock}`);
    });
    return productos;
  };
  
  console.log('🔧 Panel de administración cargado. Usa verificarProductos() para debug.');
});
