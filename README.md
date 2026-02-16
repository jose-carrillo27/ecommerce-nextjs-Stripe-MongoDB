# 🛍️ E-commerce TechStore con Next.js y Stripe

E-commerce completo construido con Next.js 15, TypeScript, Tailwind CSS y integración de pagos con Stripe.

## ✨ Características

- 🛒 Carrito de compras con persistencia local (Zustand)
- 💳 Integración completa con Stripe Checkout
- 🎨 Diseño moderno y responsive con Tailwind CSS
- ⚡ Server Components y App Router de Next.js 15
- 📱 Completamente responsive
- 🔄 Actualización en tiempo real del carrito
- ✅ Página de confirmación de pago
- 🖼️ Optimización de imágenes con Next.js Image
- 📸 Carrusel de imágenes en páginas de producto
- 📊 Páginas de detalle con especificaciones técnicas
- ⭐ Sistema de calificaciones y reseñas
- 🛍️ Compra rápida con "Comprar Ahora"
- 📦 Selector de cantidad de productos

## 🚀 Tecnologías Utilizadas

- **Frontend Framework:** Next.js 15 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Estado Global:** Zustand con persistencia
- **Pagos:** Stripe Checkout
- **Gestión de Imágenes:** Next.js Image con Unsplash

## 📋 Prerequisitos

- Node.js 18.x o superior
- Cuenta de Stripe (puedes usar las claves de prueba)

## 🔧 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Edita el archivo `.env.local` con tus credenciales de Stripe:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Para obtener tus claves de Stripe:
- Ve a [dashboard.stripe.com](https://dashboard.stripe.com)
- Regístrate o inicia sesión
- Ve a Developers > API keys
- Copia tus claves de prueba (test mode)

4. **Ejecutar el servidor de desarrollo:**
```bash
npm run dev
```

5. **Abrir el navegador:**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
ecommerce-stripe/
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts          # API para crear sesión de Stripe
│   │   └── verify-session/
│   │       └── route.ts          # API para verificar pago
│   ├── cart/
│   │   └── page.tsx              # Página del carrito
│   ├── product/
│   │   └── [id]/
│   │       ├── page.tsx          # Página de detalle de producto
│   │       └── not-found.tsx     # Página 404 para productos
│   ├── success/
│   │   └── page.tsx              # Página de confirmación
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página de inicio
│   └── globals.css               # Estilos globales
├── components/
│   ├── Header.tsx                # Navegación
│   ├── ProductCard.tsx           # Tarjeta de producto
│   ├── ImageCarousel.tsx         # Carrusel de imágenes
│   └── Icons.tsx                 # Iconos SVG
├── store/
│   └── cartStore.ts              # Estado global del carrito
├── data/
│   └── products.ts               # Datos de productos
├── types/
│   └── index.ts                  # Definiciones TypeScript
└── package.json
```

## 🎯 Funcionalidades Principales

### 1. Catálogo de Productos
- Muestra 8 productos de tecnología
- Diseño en grid responsive
- Imágenes optimizadas
- Tarjetas clickeables que llevan al detalle

### 2. Páginas de Detalle de Producto
- **Carrusel de imágenes** con navegación y miniaturas
- **Especificaciones técnicas** completas
- **Características destacadas** del producto
- **Selector de cantidad** con botones + / -
- **Sistema de calificaciones** con estrellas
- **Indicador de stock** en tiempo real
- **Tabs de información**: Descripción, Especificaciones, Características

### 3. Carrito de Compras
- Agregar productos desde cualquier página
- Actualizar cantidades
- Eliminar productos
- Persistencia local (los datos se guardan aunque recargues la página)
- Contador de items en el header

### 4. Proceso de Pago con Stripe
- **Agregar al Carrito**: Agrega el producto y continúa comprando
- **Comprar Ahora**: Compra directa sin pasar por el carrito
- Checkout seguro con Stripe
- Soporte para tarjetas de crédito/débito
- Redirección automática después del pago
- Página de confirmación con detalles

### 5. Gestión de Estado
- Zustand para estado global
- Persistencia automática en localStorage
- Funciones helper para cálculos de totales

## 🧪 Tarjetas de Prueba de Stripe

Para probar los pagos, usa estas tarjetas de prueba:

- **Pago exitoso:** 4242 4242 4242 4242
- **Pago fallido:** 4000 0000 0000 0002
- **Requiere autenticación:** 4000 0025 0000 3155

- **Fecha de expiración:** Cualquier fecha futura
- **CVC:** Cualquier 3 dígitos
- **Código postal:** Cualquier 5 dígitos

## 🎨 Personalización

### Cambiar productos
Edita el archivo `data/products.ts` para agregar o modificar productos.

### Cambiar estilos
Los estilos principales están en:
- `app/globals.css` - Estilos globales
- `tailwind.config.js` - Configuración de Tailwind
- Componentes individuales usan clases de Tailwind

### Modificar moneda
En `app/api/checkout/route.ts`, cambia:
```typescript
currency: 'usd', // Cambia a 'eur', 'mxn', etc.
```

## 📦 Construcción para Producción

```bash
npm run build
npm start
```

## 🔒 Seguridad

- Las claves secretas de Stripe NUNCA se exponen al cliente
- Las transacciones se procesan completamente en Stripe
- Validación en el servidor antes de crear sesiones de pago

## 🌐 Deployment

### Vercel (Recomendado)
1. Sube el proyecto a GitHub
2. Importa en Vercel
3. Configura las variables de entorno
4. Deploy automático

### Otras plataformas
Asegúrate de configurar las variables de entorno y que tu plataforma soporte Next.js 15.

## 🐛 Problemas Comunes

**Error de Stripe API:**
- Verifica que las claves están correctamente configuradas
- Asegúrate de usar las claves de prueba (test mode)

**El carrito no persiste:**
- Verifica que localStorage esté habilitado
- Comprueba la consola del navegador para errores

**Imágenes no cargan:**
- Verifica la configuración de dominios en `next.config.js`
- Asegúrate de tener conexión a internet

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Stripe](https://stripe.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---

Desarrollado con ❤️ usando Next.js y Stripe
