# 🔐 Instrucciones del Panel de Administrador

## 1. Inicio de Sesión como Administrador

Para acceder al panel de administración, utiliza estas credenciales:

```
Email: admin@duoc.cl
Contraseña: admin123
```

**Pasos:**
1. Ir a `login.html`
2. Introducir las credenciales del admin
3. El sistema te redirigirá automáticamente a `admin.html`

## 2. Crear un Nuevo Vendedor

Una vez en el panel de administración:

1. **Ve a la pestaña "Usuarios"** (ya estará activa por defecto)
2. **Haz clic en "Crear Usuario"** 
3. **Completa el formulario:**
   - **Nombre completo**: Ej. "Pedro Vendedor González"
   - **Correo electrónico**: Ej. "pedro.vendedor@empresa.cl"
   - **Contraseña**: Mínimo 6 caracteres
   - **Rol**: Seleccionar **"Vendedor"**
   - **Género**: Opcional
   - **Fecha de nacimiento**: Opcional
   - **Región y Comuna**: Sistema geográfico chileno completo

4. **Hacer clic en "Guardar Usuario"**

## 3. Uso del Nuevo Vendedor

El vendedor recién creado podrá:

1. **Iniciar sesión** en `login.html` con sus credenciales
2. **Acceder automáticamente** al panel de vendedor (`vendedor.html`)
3. **Ver productos** con información detallada
4. **Ver pedidos** y detalles de compras
5. **Usar funciones de búsqueda y filtrado**

## 4. Roles del Sistema

### 🔴 **Administrador (admin)**
- Gestiona usuarios (crear, eliminar)
- Gestiona productos (crear, eliminar)  
- Gestiona pedidos
- Acceso completo al sistema

### 🟡 **Vendedor (vendedor)**
- Ve todos los productos (solo lectura)
- Ve todos los pedidos (solo lectura)
- Panel optimizado para consultas rápidas
- Sin permisos de edición

### 🔵 **Cliente (cliente)**
- Acceso a la tienda pública
- Puede realizar compras
- Gestiona su perfil personal

## 5. Características de Seguridad

✅ **Validación de emails únicos**  
✅ **Contraseñas seguras (mínimo 6 caracteres)**  
✅ **DOM manipulation sin innerHTML (anti-XSS)**  
✅ **Redirección automática por roles**  
✅ **Datos persistentes en localStorage**  

## 6. Datos Geográficos

El sistema incluye las **16 regiones de Chile** con todas sus comunas:
- Región de Arica y Parinacota
- Región de Tarapacá  
- Región de Antofagasta
- Región de Atacama
- Región de Coquimbo
- Región de Valparaíso
- Región Metropolitana de Santiago
- Región de O'Higgins
- Región del Maule
- Región de Ñuble
- Región del Biobío
- Región de La Araucanía
- Región de Los Ríos
- Región de Los Lagos
- Región de Aysén del General Carlos Ibáñez del Campo
- Región de Magallanes y de la Antártica Chilena

---

**¡Listo!** Ya puedes administrar usuarios y crear vendedores con acceso seguro al sistema.