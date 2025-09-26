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
    
    // Cargar regiones desde el archivo regiones-comunas.js
    const selectRegion = document.getElementById('regionUsuario');
    if (selectRegion && typeof regionesComunas !== 'undefined') {
      // Usar la función del archivo regiones-comunas.js para poblar regiones
      poblarSelectRegiones(selectRegion);
      
      // Agregar event listener para cambio de región
      selectRegion.onchange = function() {
        const selectComuna = document.getElementById('comunaUsuario');
        if (selectComuna) {
          if (this.value) {
            // Usar la función del archivo regiones-comunas.js para poblar comunas
            poblarSelectComunas(selectComuna, this.value);
            selectComuna.disabled = false;
          } else {
            selectComuna.innerHTML = '<option value="">Primero selecciona una región</option>';
            selectComuna.disabled = true;
          }
        }
      };
      
      console.log('✅ Regiones y comunas cargadas desde regiones-comunas.js');
    } else {
      // Fallback en caso de que no esté disponible el archivo regiones-comunas.js
      console.warn('⚠️ Archivo regiones-comunas.js no encontrado, usando regiones básicas');
      selectRegion.innerHTML = `
        <option value="">Seleccionar región</option>
        <option value="Arica y Parinacota">Arica y Parinacota</option>
        <option value="Tarapacá">Tarapacá</option>
        <option value="Antofagasta">Antofagasta</option>
        <option value="Atacama">Atacama</option>
        <option value="Coquimbo">Coquimbo</option>
        <option value="Valparaíso">Valparaíso</option>
        <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
        <option value="Libertador General Bernardo O'Higgins">Libertador General Bernardo O'Higgins</option>
        <option value="Maule">Maule</option>
        <option value="Ñuble">Ñuble</option>
        <option value="Biobío">Biobío</option>
        <option value="La Araucanía">La Araucanía</option>
        <option value="Los Ríos">Los Ríos</option>
        <option value="Los Lagos">Los Lagos</option>
        <option value="Aysén del General Carlos Ibáñez del Campo">Aysén del General Carlos Ibáñez del Campo</option>
        <option value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</option>
      `;
      
      // Event listener básico para el fallback
      selectRegion.onchange = function() {
        const selectComuna = document.getElementById('comunaUsuario');
        if (selectComuna) {
          if (this.value === 'Metropolitana de Santiago') {
            selectComuna.innerHTML = `
              <option value="">Seleccionar comuna</option>
              <option value="Santiago">Santiago</option>
              <option value="Las Condes">Las Condes</option>
              <option value="Providencia">Providencia</option>
              <option value="Maipú">Maipú</option>
              <option value="Puente Alto">Puente Alto</option>
              <option value="Vitacura">Vitacura</option>
              <option value="Ñuñoa">Ñuñoa</option>
              <option value="La Florida">La Florida</option>
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
// VISTA PREVIA DEL SITIO WEB
// ====================================

// Desactivar botón de cerrar sesión en el iframe
function desactivarCerrarSesionEnIframe() {
  const iframe = document.getElementById('preview-iframe');
  
  if (iframe) {
    try {
      // Intentar acceder al contenido del iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      if (iframeDoc) {
        // Buscar todos los botones que contengan "Cerrar Sesión" o tengan onclick="logout()"
        const botonesLogout = iframeDoc.querySelectorAll('button[onclick*="logout"], a[onclick*="logout"], [href*="logout"]');
        
        botonesLogout.forEach(boton => {
          boton.disabled = true;
          boton.style.opacity = '0.5';
          boton.style.cursor = 'not-allowed';
          boton.title = 'Función deshabilitada en vista previa';
          
          // Remover eventos de click
          boton.onclick = function(e) {
            e.preventDefault();
            alert('La función de cerrar sesión está deshabilitada en la vista previa.');
            return false;
          };
        });
        
        // También buscar por texto del botón
        const todosBotones = iframeDoc.querySelectorAll('button, a');
        todosBotones.forEach(boton => {
          if (boton.textContent && boton.textContent.toLowerCase().includes('cerrar sesión')) {
            boton.disabled = true;
            boton.style.opacity = '0.5';
            boton.style.cursor = 'not-allowed';
            boton.title = 'Función deshabilitada en vista previa';
            
            boton.onclick = function(e) {
              e.preventDefault();
              alert('La función de cerrar sesión está deshabilitada en la vista previa.');
              return false;
            };
          }
        });
        
        // Ocultar elementos de panel de administración y vendedor
        ocultarElementosAdministracionEnIframe(iframeDoc);
        
        console.log('🔒 Botones de cerrar sesión desactivados en la vista previa');
      }
    } catch (error) {
      // Si hay error de CORS o acceso, inyectar script
      console.log('⚠️ No se puede acceder directamente al iframe, intentando inyección de script');
      inyectarScriptDesactivacion();
    }
  }
}

// Ocultar elementos de administración en el iframe
function ocultarElementosAdministracionEnIframe(iframeDoc) {
  if (!iframeDoc) return;
  
  try {
    // Buscar y ocultar "Panel Vendedor"
    const elementosVendedor = iframeDoc.querySelectorAll('a, button, li, span');
    elementosVendedor.forEach(elemento => {
      if (elemento.textContent && 
          (elemento.textContent.toLowerCase().includes('panel vendedor') ||
           elemento.textContent.toLowerCase().includes('panel de vendedor') ||
           (elemento.textContent.toLowerCase().includes('vendedor') && elemento.textContent.toLowerCase().includes('panel')))) {
        elemento.style.display = 'none';
        // Si es un elemento li, también ocultar el elemento padre si es necesario
        if (elemento.tagName === 'LI') {
          elemento.style.display = 'none';
        }
      }
    });
    
    // Buscar y ocultar "Panel Admin" o "Administrador"
    const elementosAdmin = iframeDoc.querySelectorAll('a, button, li, span');
    elementosAdmin.forEach(elemento => {
      if (elemento.textContent && 
          (elemento.textContent.toLowerCase().includes('panel admin') ||
           elemento.textContent.toLowerCase().includes('panel de admin') ||
           elemento.textContent.toLowerCase().includes('administrador') ||
           elemento.textContent.toLowerCase().includes('panel de administrador'))) {
        elemento.style.display = 'none';
      }
    });
    
    // Ocultar enlaces a páginas administrativas por href
    const enlacesAdmin = iframeDoc.querySelectorAll('a[href*="admin"], a[href*="vendedor"], a[href*="panel"]');
    enlacesAdmin.forEach(enlace => {
      // Solo ocultar si no es un enlace normal (como "panel de control" en contexto regular)
      if (enlace.href.includes('admin.html') || 
          enlace.href.includes('vendedor.html') ||
          enlace.textContent.toLowerCase().includes('panel')) {
        enlace.style.display = 'none';
        // Si está dentro de un li, ocultar el li también
        const parentLi = enlace.closest('li');
        if (parentLi) {
          parentLi.style.display = 'none';
        }
      }
    });
    
    // Buscar elementos en dropdowns específicamente
    const dropdownItems = iframeDoc.querySelectorAll('.dropdown-item, .nav-item, .menu-item');
    dropdownItems.forEach(item => {
      if (item.textContent && 
          (item.textContent.toLowerCase().includes('panel vendedor') ||
           item.textContent.toLowerCase().includes('panel admin') ||
           item.textContent.toLowerCase().includes('administrador'))) {
        item.style.display = 'none';
      }
    });
    
    console.log('🔒 Elementos administrativos ocultados en la vista previa');
  } catch (error) {
    console.warn('⚠️ Error al ocultar elementos administrativos:', error);
  }
}

// Inyectar script para desactivar botones (método alternativo)
function inyectarScriptDesactivacion() {
  const iframe = document.getElementById('preview-iframe');
  
  if (iframe) {
    // Script que se ejecutará dentro del iframe
    const scriptContent = `
      (function() {
        function desactivarLogout() {
          // Buscar botones de logout
          const botonesLogout = document.querySelectorAll('button[onclick*="logout"], a[onclick*="logout"], [href*="logout"]');
          
          botonesLogout.forEach(boton => {
            boton.disabled = true;
            boton.style.opacity = '0.5';
            boton.style.cursor = 'not-allowed';
            boton.title = 'Función deshabilitada en vista previa';
            
            boton.onclick = function(e) {
              e.preventDefault();
              alert('La función de cerrar sesión está deshabilitada en la vista previa.');
              return false;
            };
          });
          
          // Buscar por texto
          const todosBotones = document.querySelectorAll('button, a');
          todosBotones.forEach(boton => {
            if (boton.textContent && boton.textContent.toLowerCase().includes('cerrar sesión')) {
              boton.disabled = true;
              boton.style.opacity = '0.5';
              boton.style.cursor = 'not-allowed';
              boton.title = 'Función deshabilitada en vista previa';
              
              boton.onclick = function(e) {
                e.preventDefault();
                alert('La función de cerrar sesión está deshabilitada en la vista previa.');
                return false;
              };
            }
          });
          
          // Ocultar elementos administrativos
          function ocultarElementosAdmin() {
            // Buscar y ocultar "Panel Vendedor"
            const elementosVendedor = document.querySelectorAll('a, button, li');
            elementosVendedor.forEach(elemento => {
              if (elemento.textContent && 
                  (elemento.textContent.toLowerCase().includes('panel vendedor') ||
                   elemento.textContent.toLowerCase().includes('panel de vendedor') ||
                   elemento.textContent.toLowerCase().includes('vendedor') && elemento.textContent.toLowerCase().includes('panel'))) {
                elemento.style.display = 'none';
              }
            });
            
            // Buscar y ocultar "Panel Admin" o "Administrador"
            const elementosAdmin = document.querySelectorAll('a, button, li');
            elementosAdmin.forEach(elemento => {
              if (elemento.textContent && 
                  (elemento.textContent.toLowerCase().includes('panel admin') ||
                   elemento.textContent.toLowerCase().includes('panel de admin') ||
                   elemento.textContent.toLowerCase().includes('administrador') ||
                   elemento.textContent.toLowerCase().includes('panel de administrador'))) {
                elemento.style.display = 'none';
              }
            });
            
            // Ocultar enlaces a páginas administrativas
            const enlacesAdmin = document.querySelectorAll('a[href*="admin"], a[href*="vendedor"], a[href*="panel"]');
            enlacesAdmin.forEach(enlace => {
              enlace.style.display = 'none';
            });
          }
          
          ocultarElementosAdmin();
        }
        
        // Ejecutar cuando el DOM esté listo
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', desactivarLogout);
        } else {
          desactivarLogout();
        }
        
        // También ejecutar después de un pequeño delay para capturar elementos dinámicos
        setTimeout(desactivarLogout, 500);
      })();
    `;
    
    try {
      // Intentar inyectar el script
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDoc) {
        const script = iframeDoc.createElement('script');
        script.textContent = scriptContent;
        iframeDoc.head.appendChild(script);
      }
    } catch (error) {
      console.warn('⚠️ No se pudo inyectar script de desactivación:', error);
    }
  }
}

// Cambiar página en la vista previa
function cambiarPaginaPrevia(pagina) {
  const iframe = document.getElementById('preview-iframe');
  const container = document.querySelector('.preview-container');
  
  if (iframe && container) {
    // Mostrar indicador de carga
    container.classList.add('loading');
    
    // Cambiar la página
    iframe.src = pagina;
    
    // Remover indicador de carga cuando termine de cargar
    iframe.onload = function() {
      container.classList.remove('loading');
      
      // Desactivar botones de cerrar sesión después de cargar
      setTimeout(() => {
        desactivarCerrarSesionEnIframe();
      }, 100);
      
      // Ejecutar múltiples veces para capturar elementos que se cargan dinámicamente
      setTimeout(() => {
        desactivarCerrarSesionEnIframe();
      }, 500);
      
      setTimeout(() => {
        desactivarCerrarSesionEnIframe();
      }, 1000);
      
      console.log(`📄 Vista previa cargada: ${pagina}`);
    };
    
    // Manejar errores de carga
    iframe.onerror = function() {
      container.classList.remove('loading');
      console.error(`❌ Error al cargar: ${pagina}`);
      alert(`No se pudo cargar la página: ${pagina}`);
    };
    
    console.log(`📄 Cambiando vista previa a: ${pagina}`);
  }
}

// Cerrar vista previa y volver al panel de usuarios
function cerrarVistaPrevia() {
  // Cambiar a la pestaña de usuarios
  const usuariosTab = document.getElementById('usuarios-tab');
  const usuariosContent = document.getElementById('usuarios');
  const vistaPreviaContent = document.getElementById('vista-previa');
  
  if (usuariosTab && usuariosContent && vistaPreviaContent) {
    // Remover clases activas de vista previa
    const vistaPreviaTab = document.getElementById('vista-previa-tab');
    if (vistaPreviaTab) {
      vistaPreviaTab.classList.remove('active');
    }
    vistaPreviaContent.classList.remove('show', 'active');
    
    // Activar pestaña de usuarios
    usuariosTab.classList.add('active');
    usuariosContent.classList.add('show', 'active');
    
    console.log('🔙 Regresando al panel de administración');
  }
}

// Función para ajustar el iframe en dispositivos móviles
function ajustarVistaPrevia() {
  const iframe = document.getElementById('preview-iframe');
  const container = document.querySelector('.preview-container');
  
  if (iframe && container) {
    // En dispositivos móviles, ajustar altura
    if (window.innerWidth <= 768) {
      container.style.height = '60vh';
    } else {
      container.style.height = '70vh';
    }
  }
}

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  cargarProductos();
  
  // Ajustar vista previa en redimensionamiento
  window.addEventListener('resize', ajustarVistaPrevia);
  
  // Configurar vista previa inicial
  const iframe = document.getElementById('preview-iframe');
  if (iframe) {
    // Desactivar logout cuando se carga la página inicial del iframe
    iframe.onload = function() {
      setTimeout(() => {
        desactivarCerrarSesionEnIframe();
      }, 100);
    };
    
    // Activar cuando se cambia a la pestaña de vista previa
    const vistaPreviaTab = document.getElementById('vista-previa-tab');
    if (vistaPreviaTab) {
      vistaPreviaTab.addEventListener('shown.bs.tab', function() {
        setTimeout(() => {
          desactivarCerrarSesionEnIframe();
        }, 200);
      });
    }
  }
  
  // DEPURACIÓN: Función para verificar productos en localStorage
  window.verificarProductos = function() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    console.log('📦 Productos en localStorage:');
    productos.forEach(p => {
      console.log(`- ${p.nombre} | Categoría: ${p.categoria} | Precio: $${p.precio} | Stock: ${p.stock}`);
    });
    return productos;
  };
  
  console.log('🔧 Panel de administración cargado. Usa verificarProductos() para depuración.');
});
