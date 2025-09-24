// ============================
// Funciones de administración
// ============================

// Cargar usuarios desde localStorage
function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const tbody = document.getElementById('usuarios-table');
  tbody.innerHTML = usuarios.map(u => `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${new Date(u.fechaCreacion).toLocaleDateString()}</td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${u.email}')">Eliminar</button></td>
    </tr>
  `).join('');
}

function eliminarUsuario(email) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios = usuarios.filter(u => u.email !== email);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  cargarUsuarios();
}

// ============================
// Productos
// ============================
function mostrarFormularioProducto() {
  document.getElementById('form-producto').style.display = 'block';
}

function guardarProducto() {
  const nombre = document.getElementById('nombreProducto').value;
  const precio = document.getElementById('precioProducto').value;
  if (!nombre || !precio) return alert("Completa todos los campos");

  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push({ id: Date.now(), nombre, precio });
  localStorage.setItem('productos', JSON.stringify(productos));

  document.getElementById('form-producto').style.display = 'none';
  cargarProductos();
}

function cargarProductos() {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const tbody = document.getElementById('productos-table');
  tbody.innerHTML = productos.map(p => `
    <tr>
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.id})">Eliminar</button></td>
    </tr>
  `).join('');
}

function eliminarProducto(id) {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));
  cargarProductos();
}

// ============================
// Pedidos (ejemplo básico)
// ============================
function cargarPedidos() {
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  const tbody = document.getElementById('pedidos-table');
  tbody.innerHTML = pedidos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.cliente}</td>
      <td>$${p.total}</td>
      <td>${p.estado}</td>
      <td><button class="btn btn-sm btn-success">Marcar como enviado</button></td>
    </tr>
  `).join('');
}

// ============================
// Inicialización
// ============================
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  cargarProductos();
  cargarPedidos();
});
