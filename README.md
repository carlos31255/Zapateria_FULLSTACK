# 👟 StepStyle - Zapatería FULLSTACK

## 📋 Descripción del Proyecto

**StepStyle "Pisada Fina"** es una aplicación web completa de e-commerce para una zapatería, desarrollada como proyecto de evaluación para instituto profesional. Incluye un sistema completo de gestión de productos, carrito de compras, autenticación de usuarios, y paneles administrativos diferenciados por roles.

## 🚀 Características Principales

### 🛍️ **Sistema de E-commerce**
- ✅ Catálogo de productos con filtros avanzados
- ✅ Carrito de compras con persistencia en localStorage
- ✅ Sistema de cantidades y cálculo automático de totales
- ✅ Template-based rendering (sin innerHTML)

### 👤 **Sistema de Autenticación**
- ✅ Registro de usuarios con validación completa
- ✅ Login con redirección automática por roles
- ✅ Gestión de sesiones con localStorage
- ✅ Validación de RUT chileno y emails específicos

### 🎭 **Sistema de Roles**
- ✅ **Cliente**: Compras y gestión de perfil
- ✅ **Vendedor**: Vista readonly de productos y pedidos
- ✅ **Admin**: Gestión completa del sistema

### 📱 **Páginas Implementadas**
- ✅ **index.html** - Página principal con productos destacados
- ✅ **productos.html** - Catálogo completo con filtros
- ✅ **carrito.html** - Carrito de compras funcional
- ✅ **login.html** / **registro.html** - Sistema de autenticación
- ✅ **admin.html** - Panel administrativo completo
- ✅ **vendedor.html** - Panel de vendedor (readonly)
- ✅ **blog.html** - Blog con artículos y filtros
- ✅ **nosotros.html** - Página informativa
- ✅ **contacto.html** - Formulario de contacto
- ✅ **perfil.html** - Perfil de usuario
- ✅ **pedidos.html** - Historial de pedidos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con variables CSS
- **JavaScript ES6+** - Lógica de negocio y DOM manipulation
- **Bootstrap 5.3.2** - Componentes UI para admin y vendedor
- **Font Awesome 6.0** - Iconografía

### Características Técnicas
- **localStorage** - Persistencia de datos
- **Template system** - Rendering dinámico con `<template>` elements
- **Responsive Design** - Compatible con dispositivos móviles
- **ES6 Modules pattern** - Organización modular del código

## 📁 Estructura del Proyecto

```
Zapateria_FULLSTACK/
├── index.html              # Página principal
├── productos.html          # Catálogo de productos
├── carrito.html           # Carrito de compras
├── login.html             # Iniciar sesión
├── registro.html          # Crear cuenta
├── admin.html             # Panel administrativo
├── vendedor.html          # Panel vendedor
├── blog.html              # Blog de tendencias
├── nosotros.html          # Información de la empresa
├── contacto.html          # Formulario de contacto
├── perfil.html            # Perfil de usuario
├── pedidos.html           # Historial de pedidos
├── USUARIOS.md            # Documentación de usuarios
└── assets/
    ├── css/
    │   ├── style.css      # Estilos principales
    │   ├── productos.css  # Estilos del catálogo
    │   ├── carrito.css    # Estilos del carrito
    │   ├── auth.css       # Estilos de autenticación
    │   └── admin.css      # Estilos administrativos
    ├── js/
    │   ├── main.js        # Funciones generales y testing
    │   ├── productos.js   # Gestión de productos
    │   ├── carrito.js     # Lógica del carrito
    │   ├── auth.js        # Sistema de autenticación
    │   ├── admin.js       # Panel administrativo
    │   ├── vendedor.js    # Panel vendedor
    │   ├── blog.js        # Funcionalidad del blog
    │   ├── contacto.js    # Formulario de contacto
    │   └── regiones-comunas.js # Datos geográficos de Chile
    └── img/
        ├── logo.png       # Logo de la empresa
        └── *.avif         # Imágenes del blog
```

## 🎯 Funcionalidades por Página

### 🏠 **Página Principal (index.html)**
- Hero section con llamada a la acción
- Productos destacados (cargados dinámicamente)
- Navegación adaptativa según estado de login
- Footer informativo

### 🛍️ **Productos (productos.html)**
- Grid responsivo de productos
- Filtros por categoría y precio
- Búsqueda en tiempo real
- Botones "Agregar al carrito" funcionales
- Productos inicializados automáticamente

### 🛒 **Carrito (carrito.html)**
- Template-based rendering (sin innerHTML)
- Control de cantidades con validación
- Cálculo automático de totales
- Eliminación de productos
- Mensaje cuando carrito está vacío

### 👤 **Autenticación**
- **Login**: Validación y redirección por roles
- **Registro**: Formulario completo con validación de RUT chileno
- Selección de región/comuna de Chile
- Validación de dominios específicos (@duoc.cl, @profesor.duoc.cl, @gmail.com)

### 🎭 **Paneles por Rol**

#### 🔧 **Admin (admin.html)**
- Gestión completa de usuarios (CRUD)
- Gestión de productos (CRUD)
- Vista de pedidos
- Interfaz con Bootstrap tabs
- Formularios dinámicos con validación

#### 👥 **Vendedor (vendedor.html)**
- Vista readonly de productos con paginación
- Vista readonly de pedidos con filtros
- Modales informativos detallados
- Búsqueda y filtrado avanzado

#### 📝 **Cliente**
- **Perfil**: Visualización de datos personales
- **Pedidos**: Historial con estados y detalles
- Integración completa con carrito

## 🧪 Sistema de Testing (Desarrollo)

### Funciones Disponibles en Consola
```javascript
// Gestión del carrito
limpiarCarrito()           // Limpia solo el carrito
verCarrito()               // Muestra contenido del carrito
agregarProductoPrueba()    // Agrega producto de prueba

// Gestión de sesión
limpiarSesion()            // Limpia sesión de usuario
limpiarSesionCompleta()    // Limpia carrito + usuario + datos

// LocalStorage
verTodoLocalStorage()      // Muestra todo el localStorage
limpiarTodoLocalStorage()  // Limpia TODO (con confirmación)

// Testing
cargarDatosPrueba()        // Carga datos de prueba
probarSistemaCarrito()     // Prueba el sistema de carrito
ayudaTesting()             // Muestra ayuda completa
```



## 🚀 Instalación y Uso
 
### 🔧 **Primer Uso**
1. El sistema inicializa automáticamente 8 productos por defecto
2. Se crean usuarios por defecto para testing
3. Usa `ayudaTesting()` en consola para ver funciones disponibles

## 🎨 Diseño y UX

### 🌈 **Paleta de Colores**
```css
--color-primario: #3a3a3a    /* Gris oscuro */
--color-secundario: #f8f8f8   /* Gris claro */
--color-acento: #e63946       /* Rojo vibrante */
--color-texto: #333           /* Gris medio */
```

### 📱 **Responsive Design**
- ✅ Mobile First approach
- ✅ Breakpoints para tablet y desktop
- ✅ Menú hamburguesa en móviles
- ✅ Grid adaptativo para productos

## 🔒 Seguridad y Validaciones

### 🛡️ **Validaciones Implementadas**
- ✅ Validación de RUT chileno con dígito verificador
- ✅ Restricción de dominios de email
- ✅ Validación de mayoría de edad (18+)
- ✅ Contraseñas entre 4-10 caracteres
- ✅ Validación de cantidades en carrito
- ✅ Sanitización de inputs

### 🔐 **Control de Acceso**
- ✅ Redirección automática por roles
- ✅ Protección de páginas administrativas
- ✅ Verificación de sesión activa

## 📊 Estado del Proyecto

### ✅ **Completado**
- [x] Sistema completo de productos y carrito
- [x] Autenticación y roles funcionales
- [x] Paneles administrativos diferenciados
- [x] Blog con artículos y filtros
- [x] Formularios con validación completa
- [x] Diseño responsivo
- [x] Sistema de testing para desarrollo

### 🔄 **Funcionalidades Futuras (Opcionales)**
- [ ] Integración con base de datos
- [ ] Procesamiento de pagos
- [ ] Sistema de email automático
- [ ] Reportes y analytics
- [ ] API REST para mobile app

## 🐛 Debugging y Desarrollo

### 🔍 **Herramientas de Debug**
- Console logging extensivo en modo desarrollo
- Funciones de testing accesibles globalmente
- LocalStorage inspector integrado
- Validación de sistema de carrito

### 📝 **Logs Importantes**
- `🚀 MODO DESARROLLO ACTIVADO` - Confirma entorno de desarrollo
- `✅ Productos por defecto inicializados` - Confirma carga de datos
- `📦 Carrito actual: X items` - Estado del carrito

## 🤝 Contribución

### 📋 **Estándares de Código**
- JavaScript ES6+ con semicolons
- CSS con variables personalizadas
- HTML5 semántico
- Comentarios descriptivos en funciones complejas

### 🔧 **Para Desarrolladores**
1. Usa `ayudaTesting()` para ver funciones disponibles
2. Revisa `main.js` para funciones de utilidad
3. El sistema detecta automáticamente modo desarrollo
4. Usa `esModoDesarrollo()` para features específicas de dev

## 📄 Licencia y Créditos

### 👨‍🎓 **Proyecto Académico**
- Desarrollado para evaluación en instituto profesional
- Fines educativos y demostración de competencias
- Stack tecnológico: HTML5, CSS3, JavaScript ES6+

### 🖼️ **Recursos Utilizados**
- **Imágenes**: Unsplash (APIs públicas)
- **Iconos**: Font Awesome 6.0
- **UI Components**: Bootstrap 5.3.2
- **Fuentes**: System fonts (Segoe UI, etc.)

---

## 📞 Contacto y Soporte

Para consultas sobre este proyecto:
- 📧 Email: info@stepstyle.cl (simulado)
- 📱 Teléfono: +56 2 2345 6789 (simulado)
- 📍 Dirección: Av. Principal 123, Santiago (simulada)

---

*Desarrollado con ❤️ para demostrar competencias en desarrollo web Full-Stack*