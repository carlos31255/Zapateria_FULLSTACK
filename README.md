# 👟 StepStyle - Zapatería FULLSTACK

## 📋 Descripción del Proyecto

**StepStyle "Pisada Fina"** es una aplicación web completa de e-commerce para una zapatería, desarrollada con tecnologías web modernas. El proyecto implementa un sistema integral de gestión comercial que incluye catálogo de productos, carrito de compras, autenticación de usuarios y paneles administrativos diferenciados por roles.

## 🎯 Objetivos del Proyecto

- ✅ Crear una experiencia de compra online completa y profesional
- ✅ Implementar un sistema de roles diferenciado (Cliente, Vendedor, Administrador)
- ✅ Desarrollar validaciones específicas para el contexto chileno (RUT, regiones/comunas)
- ✅ Construir una arquitectura escalable y mantenible con tecnologías web estándar
- ✅ Garantizar diseño responsivo para todos los dispositivos

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Variables CSS, Flexbox, Grid, animaciones y transiciones
- **JavaScript ES6+** - Vanilla JS sin dependencias externas
- **Bootstrap 5.3.2** - Framework CSS solo para paneles administrativos
- **Font Awesome 6.0** - Iconografía profesional

### Características Técnicas
- **Responsive Design** - Mobile-first approach con breakpoints optimizados
- **LocalStorage** - Persistencia de datos del lado del cliente
- **Template System** - Rendering dinámico con elementos `<template>`
- **Modular Architecture** - Separación de responsabilidades en archivos especializados

## 🌟 Características Principales

### 🛍️ E-commerce Completo
- **Catálogo de Productos** - Visualización dinámica con sistema de filtros
- **Carrito de Compras** - Gestión completa con persistencia de datos
- **Filtros Avanzados** - Por categoría, precio y búsqueda de texto
- **Cálculos Automáticos** - Subtotales, totales y gestión de cantidades

### 🔐 Sistema de Autenticación
- **Registro de Usuarios** - Formulario completo con validaciones específicas
- **Inicio de Sesión** - Autenticación con redirección automática por roles
- **Validación de RUT** - Algoritmo completo con dígito verificador
- **Control de Dominios** - Restricción a emails institucionales (@duoc.cl, @profesor.duoc.cl, @gmail.com)
- **Verificación de Edad** - Validación de mayoría de edad (18+)

### 👥 Sistema de Roles y Permisos

#### 👨‍💼 Administrador
- Gestión completa de usuarios (crear, editar, eliminar)
- Administración de productos y inventario
- Visualización y gestión de pedidos
- Panel de control con navegación por tabs
- Acceso a todas las funcionalidades del sistema

#### 👨‍💻 Vendedor
- Vista de solo lectura de productos con paginación
- Consulta de pedidos con sistema de filtros
- Modales informativos con detalles ampliados
- Búsqueda y filtrado avanzado de información

#### 👤 Cliente
- Navegación y compra de productos
- Gestión de carrito de compras personalizado
- Visualización de perfil personal
- Historial de pedidos realizados

### 📱 Páginas y Funcionalidades

#### Páginas Públicas
- **Inicio** - Landing page con productos destacados y navegación principal
- **Productos** - Catálogo completo con filtros y sistema de búsqueda
- **Blog** - Artículos sobre tendencias y cuidado de calzado
- **Nosotros** - Información corporativa de la empresa
- **Contacto** - Formulario de contacto con validaciones

#### Páginas de Usuario
- **Login** - Autenticación con validación de credenciales
- **Registro** - Formulario completo con datos personales y ubicación
- **Perfil** - Visualización de información personal del usuario
- **Pedidos** - Historial detallado de compras realizadas
- **Carrito** - Gestión completa de productos seleccionados

#### Páginas Administrativas
- **Panel Admin** - Gestión completa del sistema con Bootstrap
- **Panel Vendedor** - Vista de consulta con herramientas especializadas

### 🎨 Diseño y Experiencia de Usuario

#### Sistema de Estilos
- **Variables CSS** - Paleta de colores consistente y mantenible
- **Diseño Responsivo** - Adaptación perfecta a móviles, tablets y desktop
- **Animaciones Suaves** - Transiciones y efectos visuales profesionales
- **Mobile Menu** - Navegación hamburger para dispositivos móviles

#### Componentes Reutilizables
- **Header Consistente** - Navegación unificada en todas las páginas
- **Tarjetas de Producto** - Diseño uniforme con efectos hover
- **Formularios Validados** - Mensajes de error y confirmación en tiempo real
- **Templates Dinámicos** - Rendering optimizado sin innerHTML

### 🔍 Validaciones y Seguridad

#### Validaciones Específicas para Chile
- **RUT Chileno** - Algoritmo completo de validación con dígito verificador
- **Regiones y Comunas** - Base de datos completa de ubicaciones geográficas
- **Dominios de Email** - Restricción a instituciones específicas
- **Mayoría de Edad** - Verificación automática de fecha de nacimiento

#### Controles de Seguridad
- **Sanitización de Inputs** - Limpieza y validación de datos de entrada
- **Verificación de Sesión** - Control de acceso a páginas protegidas
- **Redirección por Roles** - Navegación automática según permisos de usuario
- **Prevención de Duplicados** - Control de emails y RUTs únicos

### 📊 Gestión de Datos

#### LocalStorage Management
- **Persistencia de Carrito** - Mantenimiento de productos seleccionados
- **Sesión de Usuario** - Almacenamiento seguro de datos de autenticación
- **Historial de Pedidos** - Registro local de transacciones
- **Configuraciones** - Preferencias y datos temporales del usuario

#### Arquitectura de Datos
- **Estructura JSON** - Organización eficiente de información
- **Relaciones de Datos** - Vinculación entre usuarios, productos y pedidos
- **Backup y Recuperación** - Sistemas de respaldo de información crítica

## 📈 Métricas y Rendimiento

### Características de Rendimiento
- **Carga Optimizada** - Sin dependencias externas pesadas
- **Lazy Loading** - Carga diferida de imágenes de productos
- **Debounce en Búsquedas** - Optimización de consultas en tiempo real
- **Template Caching** - Reutilización eficiente de elementos DOM

### Compatibilidad
- **Navegadores Modernos** - Soporte completo para Chrome, Firefox, Safari, Edge
- **Dispositivos Móviles** - Experiencia optimizada para iOS y Android
- **Accesibilidad** - Cumplimiento de estándares básicos de usabilidad
- **SEO Ready** - Estructura semántica preparada para indexación

## 🚀 Funcionalidades Avanzadas

### Sistema de Blog
- **Gestión de Artículos** - Contenido dinámico sobre calzado y tendencias
- **Categorización** - Organización por temas (tendencias, cuidado, consejos)
- **Filtros de Contenido** - Búsqueda y clasificación de artículos

### E-commerce Profesional
- **Gestión de Inventario** - Control de stock en tiempo real
- **Cálculos Comerciales** - Subtotales, impuestos y totales automáticos
- **Estados de Pedidos** - Seguimiento completo del proceso de compra
- **Notificaciones** - Sistema de alertas y confirmaciones de usuario

### Panel Administrativo
- **Dashboard Interactivo** - Navegación por pestañas con Bootstrap
- **CRUD Completo** - Operaciones completas sobre usuarios y productos
- **Reportes Visuales** - Información estadística y de gestión
- **Formularios Dinámicos** - Interfaces adaptativas según tipo de operación

## 🎓 Valor Académico y Profesional

Este proyecto demuestra competencias avanzadas en:

- **Desarrollo Frontend Completo** - HTML5, CSS3, JavaScript ES6+
- **Arquitectura de Software** - Separación de responsabilidades y código mantenible
- **Experiencia de Usuario** - Diseño responsivo y interfaces intuitivas
- **Validaciones Complejas** - Algoritmos específicos y controles de seguridad
- **Gestión de Estados** - Manejo de datos persistentes y sesiones de usuario
- **Integración de Tecnologías** - Combinación efectiva de múltiples herramientas

## 🏆 Logros del Proyecto

- ✅ **Sistema Completo** - E-commerce funcional con todas las características esenciales
- ✅ **Código de Calidad** - Arquitectura limpia y documentada
- ✅ **Experiencia Profesional** - Interfaz comparable a sitios comerciales reales
- ✅ **Innovación Técnica** - Implementación de características avanzadas sin frameworks
- ✅ **Localización Chilena** - Adaptación completa al contexto nacional

---

**StepStyle** representa una implementación completa y profesional de una solución e-commerce moderna, demostrando dominio técnico en el desarrollo web frontend y capacidad para crear experiencias de usuario excepcionales.