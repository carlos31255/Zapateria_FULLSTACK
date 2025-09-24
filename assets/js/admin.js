// ====================================
// GESTIÓN DE USUARIOS
// ====================================

// Cargar usuarios desde localStorage
function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const tbody = document.getElementById('usuarios-table');
  tbody.innerHTML = usuarios.map(u => `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td><span class="badge ${obtenerClaseRol(u.rol)}">${u.rol}</span></td>
      <td>${u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleDateString() : 'No disponible'}</td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${u.email}')">Eliminar</button></td>
    </tr>
  `).join('');
}

function obtenerClaseRol(rol) {
  switch(rol) {
    case 'admin': return 'bg-danger';
    case 'vendedor': return 'bg-warning text-dark';
    case 'cliente': return 'bg-info';
    default: return 'bg-secondary';
  }
}

// Mostrar formulario de creación de usuario
function mostrarFormularioUsuario() {
  document.getElementById('form-usuario').style.display = 'block';
  // Cargar regiones en el select
  poblarSelectRegiones(document.getElementById('regionUsuario'));
  
  // Agregar event listener para cambio de región
  document.getElementById('regionUsuario').onchange = function() {
    poblarSelectComunas(this.value, document.getElementById('comunaUsuario'));
  };
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
  const precio = parseInt(document.getElementById('precioProducto').value);
  const imagen = document.getElementById('imagenProducto').value.trim();
  const descripcion = document.getElementById('descripcionProducto').value.trim();
  const stock = parseInt(document.getElementById('stockProducto').value);

  if (!nombre || !precio || !imagen || isNaN(stock)) {
    return alert("Completa todos los campos obligatorios (nombre, precio, imagen, stock)");
  }

  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push({
    id: Date.now(),
    nombre,
    precio,
    imagen,
    descripcion,
    stock
  });

  localStorage.setItem('productos', JSON.stringify(productos));

  // Resetear formulario
  document.getElementById('form-producto').style.display = 'none';
  document.getElementById('nombreProducto').value = "";
  document.getElementById('precioProducto').value = "";
  document.getElementById('imagenProducto').value = "";
  document.getElementById('descripcionProducto').value = "";
  document.getElementById('stockProducto').value = "";

  cargarProductos();
}


function cargarProductos() {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const tbody = document.getElementById('productos-table');
  tbody.innerHTML = productos.map(p => `
    <tr>
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString('es-CL')}</td>
      <td>Stock: ${p.stock}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}


function eliminarProducto(id) {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(productos));
  cargarProductos();
}


// ====================================
// PEDIDOS
// ====================================

// Pedidos (ejemplo básico)
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

// ====================================
// FUNCIONES GEOGRÁFICAS CHILENAS
// ====================================

// Datos de regiones y comunas de Chile
const regionesComunas = {
  "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
  "Región Metropolitana de Santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "Región de O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Región de Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Región de Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

// Poblar select de regiones
function poblarSelectRegiones(selectElement) {
  if (!selectElement) return;
  
  selectElement.innerHTML = '<option value="">Seleccionar región</option>';
  
  Object.keys(regionesComunas).forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    selectElement.appendChild(option);
  });
}

// Poblar select de comunas basado en región seleccionada
function poblarSelectComunas(region, selectElement) {
  if (!selectElement) return;
  
  selectElement.innerHTML = '<option value="">Seleccionar comuna</option>';
  
  if (region && regionesComunas[region]) {
    selectElement.disabled = false;
    regionesComunas[region].forEach(comuna => {
      const option = document.createElement('option');
      option.value = comuna;
      option.textContent = comuna;
      selectElement.appendChild(option);
    });
  } else {
    selectElement.disabled = true;
    selectElement.innerHTML = '<option value="">Primero selecciona una región</option>';
  }
}

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  cargarProductos();
  cargarPedidos();
});
