# 🚀 Guía Rápida de Configuración

## Paso 1: Instalar Dependencias

```bash
npm install
```

## Paso 2: Configurar Stripe

1. Ve a https://dashboard.stripe.com
2. Crea una cuenta o inicia sesión
3. Activa el "Modo de prueba" (Test mode) en la esquina superior derecha
4. Ve a Developers > API keys
5. Copia las claves:
   - Publishable key (comienza con pk_test_)
   - Secret key (comienza con sk_test_)

## Paso 3: Configurar Variables de Entorno

Abre el archivo `.env.local` y reemplaza con tus claves:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_AQUI
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_AQUI
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Paso 4: Ejecutar el Proyecto

```bash
npm run dev
```

Abre tu navegador en: http://localhost:3000

## 🧪 Probar el Pago

1. Agrega productos al carrito
2. Ve al carrito
3. Click en "Proceder al Pago"
4. Usa esta tarjeta de prueba:
   - Número: 4242 4242 4242 4242
   - Fecha: Cualquier fecha futura (ej: 12/25)
   - CVC: 123
   - Código postal: 12345

¡Eso es todo! 🎉

## 📝 Notas Importantes

- Siempre usa el MODO DE PRUEBA de Stripe para desarrollo
- NUNCA subas tus claves secretas a GitHub
- Las claves de prueba comienzan con `pk_test_` y `sk_test_`
- Las claves de producción comienzan con `pk_live_` y `sk_live_`

## ❓ Problemas Comunes

### "Invalid API Key"
- Verifica que copiaste las claves correctamente
- Asegúrate de usar las claves de TEST mode
- No incluyas espacios al copiar

### El pago no funciona
- Verifica que estés usando las tarjetas de prueba de Stripe
- Revisa la consola del navegador para errores
- Asegúrate de que las variables de entorno estén configuradas

### Las imágenes no cargan
- Verifica tu conexión a internet
- Las imágenes vienen de Unsplash y requieren conexión

## 🆘 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor en la terminal
3. Consulta la documentación de Stripe: https://stripe.com/docs
